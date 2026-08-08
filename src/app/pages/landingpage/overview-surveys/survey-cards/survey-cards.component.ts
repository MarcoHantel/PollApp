import { Component, Input } from '@angular/core';
import { Survey } from '../../../../interfaces/survey.model';


@Component({
  selector: 'app-survey-cards',
  imports: [],
  templateUrl: './survey-cards.component.html',
  styleUrl: './survey-cards.component.scss'
})
export class SurveyCardComponent {
  @Input({ required: true }) survey!: Survey;
}

