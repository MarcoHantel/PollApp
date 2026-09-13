import { Component, inject } from '@angular/core';
import { SurveyCreateService } from '../../../service/survey-create.service.service';



@Component({
  selector: 'app-survey-detailss',
  imports: [],
  templateUrl: './survey-details.component.html',
  styleUrl: './survey-details.component.scss'
})
export class SurveyDetailsComponent {

  surveyCreateService = inject(SurveyCreateService);

}
  
