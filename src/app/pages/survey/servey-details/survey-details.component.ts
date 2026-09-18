import { Component, inject } from '@angular/core';
import { SurveyCreateService } from '../../../service/survey-create.service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-survey-detailss',
  imports: [ReactiveFormsModule],
  templateUrl: './survey-details.component.html',
  styleUrl: './survey-details.component.scss'
})
export class SurveyDetailsComponent {

  surveyCreateService = inject(SurveyCreateService);


}

