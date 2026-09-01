import { Injectable, signal } from '@angular/core';
import { SurveyCreate } from '../interfaces/survey-create.model';

// survey-create.service.ts
@Injectable({ providedIn: 'root' })
export class SurveyCreateService {

  // alle gespeicherten Surveys
  surveys = signal<SurveyCreate[]>([]);

  // aktuell in Bearbeitung
  currentSurvey = signal<SurveyCreate | null>(null);

  // Survey hinzufügen
  addSurvey(survey: SurveyCreate) {
    this.surveys.update(list => [...list, survey]);
  }

  // nach Kategorie filtern
  getSurveysByCategory(category: string): SurveyCreate[] {
    return this.surveys().filter(s => s.category === category);
  }
}