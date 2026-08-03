import { Component, inject } from '@angular/core';
import { SurveyCardComponent } from './survey-card/survey-card.component';
import { DisplySurveyService } from '../../../service/disply-survey.service';


@Component({
  selector: 'app-your-survey',
  imports: [SurveyCardComponent],
  templateUrl: './your-survey.component.html',
  styleUrl: './your-survey.component.scss'
})
export class YourSurveyComponent {

  private exitingSurveyService = inject(DisplySurveyService);

currentSurveys = this.exitingSurveyService.surveys;

}
