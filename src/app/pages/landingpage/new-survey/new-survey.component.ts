import { Component, inject } from '@angular/core';
import { SurveyCreateService } from '../../../service/survey-create.service.service'; 

@Component({
  selector: 'app-new-survey',
  imports: [],
  templateUrl: './new-survey.component.html',
  styleUrl: './new-survey.component.scss'
})
export class NewSurveyComponent {
surveyCreateService = inject(SurveyCreateService);  
}
