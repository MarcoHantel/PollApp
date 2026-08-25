import { Component, inject } from '@angular/core';
import { DisplySurveyService } from './../../../service/disply-survey.service';
import { CategoryDropdownService } from './../../../service/category-dropdown.service';
import { SurveyCardComponent } from './survey-cards/survey-cards.component';



@Component({
  selector: 'app-overview-surveys',
  imports: [SurveyCardComponent],
  templateUrl: './overview-surveys.component.html',
  styleUrl: './overview-surveys.component.scss'
})
export class OverviewSurveysComponent {

  private surveyService = inject(DisplySurveyService);
  currentSurveys = this.surveyService.getEndingSoonSurveys();

  private dropDownService = inject(CategoryDropdownService)
  dropDown = this.dropDownService

  // in der Komponente die alle anzeigen soll:
  allSurveys = this.surveyService.getAllSurveys();
}
