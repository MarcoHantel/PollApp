import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { CategoryDropdownService } from '../../service/category-dropdown.service';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-create-survey',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.scss'
})
export class CreateSurveyComponent {

  private dropDownService = inject(CategoryDropdownService)
  dropDown = this.dropDownService

  readonly maxAnswers = 6; // A, B, C, D
  readonly maxQuestions = 6; // Anzahl meiner Fragen


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

  deleteInput(control: FormControl) {
    control.setValue(''); // mit setValue löschen bzw neu setzten
  }


  // Question part
  questions = new FormArray([
    this.createQuestion() // erste Frage steht fest
  ]);

  createQuestion(): FormGroup {
    return new FormGroup({
      questionText: new FormControl(''),
      allowMultiple: new FormControl(false),
      answers: new FormArray([
        new FormControl('') // erste Antwort steht fest
      ])
    });
  }



  // Question hinzufügen
  addQuestion() {
    if (this.canAddQuestion) {  // ← fehlt dieser Check?
      this.questions.push(this.createQuestion());
    }
  }
  get canAddQuestion(): boolean {
    return this.questions.length < this.maxQuestions;
  }

  // Question löschen
  deleteQuestion(qIndex: number) {
    if (qIndex > 0) { // erste Frage kann nicht gelöscht werden
      this.questions.removeAt(qIndex);
    }
  }

  // Answer hinzufügen
  addAnswer(qIndex: number) {
    const answers = this.getAnswers(qIndex);
    if (answers.length < this.maxAnswers) {
      answers.push(new FormControl(''));
    }
  }

  // Answer löschen
  deleteAnswer(qIndex: number, aIndex: number) {
    this.getAnswers(qIndex).removeAt(aIndex);
  }

  // Answers einer Question holen
  getAnswers(qIndex: number): FormArray {
    return this.questions.at(qIndex).get('answers') as FormArray;
  }

  // Checkbox einer Question holen
  getAllowMultiple(qIndex: number): FormControl {
    return this.questions.at(qIndex).get('allowMultiple') as FormControl;
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  canAddAnswer(qIndex: number): boolean {
    return this.getAnswers(qIndex).length < this.maxAnswers;
  }
}
