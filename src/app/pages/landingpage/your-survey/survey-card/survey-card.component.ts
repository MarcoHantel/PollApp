import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SurveyCreate } from '../../../../interfaces/survey-create.model'; // ← Pfad anpassen!

@Component({
  selector: 'app-survey-card',
  imports: [RouterLink], // ← hinzufügen
  templateUrl: './survey-card.component.html',
  styleUrl: './survey-card.component.scss'
})
export class SurveyCardComponent {
  @Input({ required: true }) survey!: SurveyCreate; // ← neues Interface

  getDaysLeft(): number {
    const endDate = new Date(this.survey.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = endDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}