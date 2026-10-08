
import { Component, Input } from '@angular/core';
import { SurveyCreate } from '../../../../interfaces/survey-create.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-survey-cards',
  imports: [RouterLink],
  templateUrl: './survey-cards.component.html',
  styleUrl: './survey-cards.component.scss'
})
export class SurveyCardComponent {
  @Input({ required: true }) survey!: SurveyCreate;

  getDaysLeft(): number {
    const endDate = new Date(this.survey.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const diff = endDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24)); // Millisekunden in Tage umrechnen
  }
}