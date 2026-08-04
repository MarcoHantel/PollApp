import { Component, inject } from '@angular/core';
import { DisplySurveyService } from './../../../service/disply-survey.service';
import { SurveyCardComponent } from './survey-card/survey-card.component';

@Component({
  selector: 'app-your-survey',
  imports: [SurveyCardComponent],
  templateUrl: './your-survey.component.html',
  styleUrl: './your-survey.component.scss'
})
export class YourSurveyComponent {
  private surveyService = inject(DisplySurveyService);

  currentSurveys = this.surveyService.getEndingSoonSurveys();
}