import { Component, inject } from '@angular/core';
import { CategoryDropdownService } from './../../../service/category-dropdown.service';
import { SurveyCardComponent } from './survey-cards/survey-cards.component';
import { SurveyCreateService } from '../../../service/survey-create.service.service';

@Component({
  selector: 'app-overview-surveys',
  imports: [SurveyCardComponent],
  templateUrl: './overview-surveys.component.html',
  styleUrl: './overview-surveys.component.scss'
})
export class OverviewSurveysComponent {
  surveyCreateService = inject(SurveyCreateService);

  private dropDownService = inject(CategoryDropdownService);
  dropDown = this.dropDownService;
}
