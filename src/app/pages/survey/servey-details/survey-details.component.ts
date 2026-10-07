import { Component, inject } from '@angular/core';
import { SurveyCreateService } from '../../../service/survey-create.service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-survey-detailss',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './survey-details.component.html',
  styleUrl: './survey-details.component.scss'
})
export class SurveyDetailsComponent {

  surveyCreateService = inject(SurveyCreateService);

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

}

