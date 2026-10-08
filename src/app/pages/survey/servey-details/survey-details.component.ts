import { Component, inject, signal } from '@angular/core';
import { SurveyCreateService } from '../../../service/survey-create.service.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SurveyCreate } from '../../../interfaces/survey-create.model';

@Component({
  selector: 'app-survey-details',
  imports: [RouterLink],
  templateUrl: './survey-details.component.html',
  styleUrl: './survey-details.component.scss'
})
export class SurveyDetailsComponent {

  surveyCreateService = inject(SurveyCreateService);
  route = inject(ActivatedRoute); // ← Route auslesen

  // aktuelles Survey basierend auf ID
  survey = signal<SurveyCreate | null>(null);

  constructor() {
    // ID aus der URL holen
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Survey mit dieser ID finden
    const found = this.surveyCreateService.surveys().find(s => s.id === id);
    if (found) {
      this.survey.set(found);
    }
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
}