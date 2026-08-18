import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-survey',
  imports: [ReactiveFormsModule],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.scss'
})
export class CreateSurveyComponent {
  questions = 1;

  // FormControl 
  surveyName = new FormControl('', {
    validators: [Validators.required, Validators.minLength(4)]
  });

  surveyEndDate = new FormControl('');

  surveyQuestions = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6)]
  });

  surveyAnswer = new FormControl('', {
    validators: [Validators.required]
  });

  surveyDescription = new FormControl('', {
    validators: [Validators.required, Validators.maxLength(500)]
  });

  // check ob Enddatum da, wenn nicht nehme das heutige + 24 Stunden
  checkEndDate() {
    if (!this.surveyEndDate.value) {

      const defaultDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const formatted = defaultDate.toISOString().split('T')[0]; // Datum in das Format YYYY-MM-DD umwandeln (was input type="date" braucht)
      this.surveyEndDate.setValue(formatted);       // ← ins FormControl setzen!

      console.log(formatted);
      // Keine else notwendig wenn Datum vom User eigeben wurde.
    }
  }

  // setzt meinen Wert wieder aud 'leer' wenn click auf submit 
  updateInput() {
    this.checkEndDate();

    this.surveyName.setValue('');
    this.surveyEndDate.setValue('');
    this.surveyQuestions.setValue('');
    this.surveyAnswer.setValue('');
    this.surveyDescription.setValue('');
  }

  // setzt meinen Wert wieder aud 'leer' click auf löschen
  deleteInput(control: FormControl) {
    control.setValue(''); // ← nur das angeklickte Feld leeren ✅
  }
}
