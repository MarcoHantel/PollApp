import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormArray} from '@angular/forms';
import { CategoryDropdownService } from '../../service/category-dropdown.service';


@Component({
  selector: 'app-create-survey',
  imports: [ReactiveFormsModule],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.scss'
})
export class CreateSurveyComponent {

  private dropDownService = inject(CategoryDropdownService)
  dropDown = this.dropDownService
  readonly maxAnswers = 6; // A, B, C, D
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
    control.setValue(''); // ← nur das angeklickte Feld leeren
  }



  answers = new FormArray<FormControl<string | null>>([
    new FormControl('') // Antwort A ist von Anfang an da
  ]);

  get canAddAnswer(): boolean {
    return this.answers.length < this.maxAnswers;
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 = 'A'
  }

  addAnswer() {
    if (this.canAddAnswer) {
      this.answers.push(new FormControl(''));
    }
  }

  deleteAnswer(index: number) {
    this.answers.removeAt(index);
  }

}

