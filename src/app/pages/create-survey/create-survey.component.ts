import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-survey',
  imports: [ReactiveFormsModule],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.scss'
})
export class CreateSurveyComponent {

  surveyName = new FormControl('',{
    validators:[Validators.required, Validators.minLength(4)]
  });

  // setzt meinen Wert wieder aud 'leer'
  updateInput(){
    this.surveyName.setValue('');
  }

    // setzt meinen Wert wieder aud 'leer'
  deleteInput(){
    this.surveyName.setValue('');
  }

}
