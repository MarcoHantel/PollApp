import { Injectable, signal, computed, inject } from '@angular/core'; // ← inject hinzufügen
import { SurveyCreate } from '../interfaces/survey-create.model';
import { SupabaseService } from './supabase.service'; // ← hinzufügen

@Injectable({ providedIn: 'root' })
export class SurveyCreateService {

  private supabaseService = inject(SupabaseService); // ← hinzufügen

  // Overlay
  showSuccessOverlay = signal(false);

  // Filter Signals
  selectedStatus = signal<'all' | 'active' | 'past'>('all');
  selectedCategory = signal('all');

  // aktuelle Survey in Bearbeitung
  currentSurvey = signal<SurveyCreate | null>(null);

  // pro Frage die ausgewählten Antworten speichern
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

  // leeres Signal – wird von Supabase befüllt
  surveys = signal<SurveyCreate[]>([]);  // ← Testdaten weg!

  // Supabase laden
  async loadSurveys() {
    const { data, error } = await this.supabaseService.supabase
      .from('surveys')
      .select(`
        *,
        questions (
          *,
          answers (*)
        )
      `)

    if (error) {
      console.error('Fehler:', error);
      return;
    }

    if (data) {
      console.log('Surveys von Supabase:', data);
      this.surveys.set(data);
    }
  }

  // Survey hinzufügen
  addSurvey(survey: SurveyCreate) {
    this.surveys.update(list => [...list, survey]);
  }

  // Kategorie Filter setzen
  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  // Status Filter setzen
  setStatus(status: 'all' | 'active' | 'past') {
    this.selectedStatus.set(status);
  }

  // die 3 Surveys die am frühesten ablaufen
  getEndingSoonSurveys(limit: number = 3): SurveyCreate[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [...this.surveys()]
      .filter(s => new Date(s.endDate) >= today)
      .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
      .slice(0, limit);
  }

  // gefilterte Surveys – reagiert automatisch auf Änderungen
  filteredSurveys = computed(() => {
    let result = this.surveys();

    if (this.selectedCategory() !== 'all') {
      result = result.filter(s => s.category === this.selectedCategory());
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);


if (this.selectedStatus() === 'active') {
  result = result.filter(s => new Date(s.endDate) >= today); // ← bereits so ✅
} else if (this.selectedStatus() === 'past') {
  result = result.filter(s => new Date(s.endDate) < today);  // ← bereits so ✅
}

    return result;
  });
}