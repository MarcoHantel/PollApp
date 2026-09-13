import { Component, inject } from '@angular/core';
import { SurveyCreateService } from '../../../service/survey-create.service.service';
import { SurveyCardComponent } from './survey-card/survey-card.component';

@Component({
  selector: 'app-your-survey',
  imports: [SurveyCardComponent],
  templateUrl: './your-survey.component.html',
  styleUrl: './your-survey.component.scss'
})
export class YourSurveyComponent {
  private surveyService = inject(SurveyCreateService);

  currentSurveys = this.surveyService.getEndingSoonSurveys();
}