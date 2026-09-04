import { Injectable, signal, computed } from '@angular/core';
import { SurveyCreate } from '../interfaces/survey-create.model';

@Injectable({ providedIn: 'root' })
export class SurveyCreateService {

  showSuccessOverlay = signal(false); // ← hier hinzufügen

  selectedStatus = signal<'all' | 'active' | 'past'>('all');
  selectedCategory = signal('all');

  surveys = signal<SurveyCreate[]>([
    { id: 1, name: "Das ist der Title", category: "Team Activities", endDate: "2026-09-10", description: "", active: true, questions: [] },
    { id: 2, name: "Sport ist gesund", category: "Health & Wellness", endDate: "2026-11-05", description: "", active: false, questions: [] },
    { id: 3, name: "Was ist dein Lieblingsfilm?", category: "Gaming & Entertainment", endDate: "2026-09-01", description: "", active: true, questions: [] },
    { id: 4, name: "Was ist deine Lieblingsparty?", category: "Team Activities", endDate: "2026-010-01", description: "", active: true, questions: [] },
    { id: 5, name: "Was ist deine Lieblingsmusik?", category: "Technology & Innovation", endDate: "2026-09-04", description: "", active: false, questions: [] },
    { id: 6, name: "Was ist das beste Brettspiel aller Zeiten?", category: "Gaming & Entertainment", endDate: "2026-11-04", description: "", active: false, questions: [] },
    { id: 7, name: "Die Besten Teamspiele aller Zeiten", category: "Team Activities", endDate: "2026-09-03", description: "", active: false, questions: [] },
  ]);

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  addSurvey(survey: SurveyCreate) {
    this.surveys.update(list => [...list, survey]);
  }

  currentSurvey = signal<SurveyCreate | null>(null);


  setStatus(status: 'all' | 'active' | 'past') {
    this.selectedStatus.set(status);
  }

  filteredSurveys = computed(() => {
    let result = this.surveys();

    // Kategorie Filter
    if (this.selectedCategory() !== 'all') {
      result = result.filter(s => s.category === this.selectedCategory());
    }

    // Filter vom Statu
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.selectedStatus() === 'active') {
      result = result.filter(s => new Date(s.endDate) >= today); // noch nicht amgelaufen
    } else if (this.selectedStatus() === 'past') {
      result = result.filter(s => new Date(s.endDate) < today);  // bereits abgelaufen 
    }

    return result;
  });
}



