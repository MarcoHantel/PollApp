import { Injectable, signal, computed, inject } from '@angular/core';
import { SurveyCreate, Question } from '../interfaces/survey-create.model';
import { SupabaseService } from './supabase.service';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class SurveyCreateService {

  private supabaseService = inject(SupabaseService);
  
  showSuccessOverlay = signal(false);
  lastCreatedSurveyId = signal<number | null>(null);

  selectedStatus = signal<'all' | 'active' | 'past'>('all');
  selectedCategory = signal('all');

  currentSurvey = signal<SurveyCreate | null>(null);

  surveys = signal<SurveyCreate[]>([]);

  // AUSWAHL DER ANTWORTEN (Checkboxen)
  selectedAnswers = signal<{ [questionIndex: number]: number[] }>({});

  toggleAnswer(questionIndex: number, answerIndex: number, allowMultiple: boolean) {
    this.selectedAnswers.update(current => {
      const selected = current[questionIndex] ?? [];
      if (allowMultiple) {
        const alreadySelected = selected.includes(answerIndex);
        return {
          ...current,
          [questionIndex]: alreadySelected
            ? selected.filter(i => i !== answerIndex)
            : [...selected, answerIndex]
        };
      } else {
        return {
          ...current,
          [questionIndex]: [answerIndex]
        };
      }
    });
  }

  isSelected(questionIndex: number, answerIndex: number): boolean {
    return (this.selectedAnswers()[questionIndex] ?? []).includes(answerIndex);
  }

  hasSelection(): boolean {
    return Object.values(this.selectedAnswers()).some(list => list.length > 0);
  }


  // LIVE AUSWERTUNG (Votes)                        
  voteCounts = signal<Record<number, number>>({});
  private votesChannel: RealtimeChannel | null = null;

  async loadVotes(surveyId: number) {
    const { data, error } = await this.supabaseService.supabase
      .from('votes')
      .select('answer_id')
      .eq('survey_id', surveyId);

    if (error) {
      console.error('Votes Fehler:', error);
      return;
    }

    const counts: Record<number, number> = {};
    for (const vote of data) {
      counts[vote.answer_id] = (counts[vote.answer_id] ?? 0) + 1;
    }
    this.voteCounts.set(counts);
  }

  subscribeToVotes(surveyId: number) {
    this.unsubscribeVotes(); 

    this.votesChannel = this.supabaseService.supabase
      .channel('votes-' + surveyId)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'votes', filter: `survey_id=eq.${surveyId}` },
        (payload) => {
          const answerId = (payload.new as any).answer_id;
          this.voteCounts.update(counts => ({
            ...counts,
            [answerId]: (counts[answerId] ?? 0) + 1
          }));
        }
      )
      .subscribe();
  }

  unsubscribeVotes() {
    if (this.votesChannel) {
      this.supabaseService.supabase.removeChannel(this.votesChannel);
      this.votesChannel = null;
    }
  }

  getPercent(question: Question, answerId?: number): number {
    if (!answerId) return 0;
    const counts = this.voteCounts();

    const total = question.answers.reduce((sum, a) => sum + (counts[a.id!] ?? 0), 0);
    if (total === 0) return 0;

    return Math.round(((counts[answerId] ?? 0) / total) * 100);
  }


  async submitVotes(survey: SurveyCreate): Promise<boolean> {
    const selected = this.selectedAnswers();
    const rows: { survey_id: number; question_id: number; answer_id: number }[] = [];

    survey.questions.forEach((question, qi) => {
      (selected[qi] ?? []).forEach(ai => {
        rows.push({
          survey_id: survey.id,
          question_id: question.id!,
          answer_id: question.answers[ai].id!
        });
      });
    });


    if (rows.length === 0) return false; 

    const { error } = await this.supabaseService.supabase.from('votes').insert(rows);

    if (error) {
      console.error('Vote Fehler:', error);
      return false;
    }

    this.selectedAnswers.set({}); 
    return true;
  }



  // SURVEYS LADEN & SPEICHERN

  async loadSurveys() {
    const { data, error } = await this.supabaseService.supabase
      .from('surveys')
      .select(`
        *,
        questions (
          *,
          answers (*)
        )
      `);

    if (error) {
      console.error('Fehler:', error);
      return;
    }

    if (data) {
      this.surveys.set(data);
    }
  }

  async addSurvey(survey: SurveyCreate) {

    // Survey speichern
    const { data: surveyData, error: surveyError } = await this.supabaseService.supabase
      .from('surveys')
      .insert({
        name: survey.name,
        category: survey.category,
        endDate: survey.endDate,
        description: survey.description,
      })
      .select()
      .single();

    if (surveyError) {
      console.error('Survey Fehler:', surveyError);
      return;
    }

    const surveyId = surveyData.id;
    this.lastCreatedSurveyId.set(surveyId);

    for (const question of survey.questions) {
      const { data: questionData, error: questionError } = await this.supabaseService.supabase
        .from('questions')
        .insert({
          survey_id: surveyId,
          questionText: question.questionText,
          allowMultiple: question.allowMultiple,
        })
        .select()
        .single();

      if (questionError) {
        console.error('Question Fehler:', questionError);
        return;
      }

      const questionId = questionData.id;

      const answersToInsert = question.answers
        .filter((a: any) => a !== null && a !== '' && a !== undefined)
        .map((a: any) => ({
          question_id: questionId,
          text: typeof a === 'string' ? a : a.text 
        }));

      const { error: answerError } = await this.supabaseService.supabase
        .from('answers')
        .insert(answersToInsert);

      if (answerError) {
        console.error('Answer Fehler:', answerError);
        return;
      }
    }

    await this.loadSurveys();
  }



  // FILTER
  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  setStatus(status: 'all' | 'active' | 'past') {
    this.selectedStatus.set(status);
  }

  getEndingSoonSurveys(limit: number = 3): SurveyCreate[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [...this.surveys()]
      .filter(s => new Date(s.endDate) >= today)
      .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
      .slice(0, limit);
  }

  filteredSurveys = computed(() => {
    let result = this.surveys();

    if (this.selectedCategory() !== 'all') {
      result = result.filter(s => s.category === this.selectedCategory());
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.selectedStatus() === 'active') {
      result = result.filter(s => new Date(s.endDate) >= today);
    } else if (this.selectedStatus() === 'past') {
      result = result.filter(s => new Date(s.endDate) < today);
    }

    return result;
  });
}