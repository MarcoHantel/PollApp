import { Component, inject } from '@angular/core';
import { DisplySurveyService } from './../../../service/disply-survey.service';


@Component({
  selector: 'app-overview-surveys',
  imports: [],
  templateUrl: './overview-surveys.component.html',
  styleUrl: './overview-surveys.component.scss'
})
export class OverviewSurveysComponent {

  private surveyService = inject(DisplySurveyService);

  currentSurveys = this.surveyService.getEndingSoonSurveys();

}
