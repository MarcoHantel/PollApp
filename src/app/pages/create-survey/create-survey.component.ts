import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { CategoryDropdownService } from '../../service/category-dropdown.service';
import { RouterLink } from "@angular/router";
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SurveyCreateService } from '../../service/survey-create.service.service';
import { SurveyCreate } from '../../interfaces/survey-create.model';
import { OverlayComponent } from './overlay/overlay.component';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-create-survey',
  imports: [ReactiveFormsModule, RouterLink, OverlayComponent],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.scss'
})


export class CreateSurveyComponent {

  constructor() {
  // bei jeder Eingabe prüfen, ob alle Fehler behoben sind
  merge(
    this.surveyName.valueChanges,
    this.surveyEndDate.valueChanges,
    this.questions.valueChanges
  )
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.checkErrorsResolved());
}

checkErrorsResolved() {
  if (this.showErrors && this.getErrors().length === 0) {
    this.showErrors = false;
  }
}

  surveyCreateService = inject(SurveyCreateService);
  private dropDownService = inject(CategoryDropdownService)
  dropDown = this.dropDownService

  canPublish(): boolean {
    return this.surveyName.valid
      && this.surveyEndDate.valid
      && this.questions.valid
      && this.dropDown.choose !== 'Choose categorie';
  }

  readonly maxAnswers = 6;
  readonly maxQuestions = 6;
  readonly minAnswers = 2;

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  readonly today = this.formatDate(new Date());

  private notInPast = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return control.value < this.today ? { pastDate: true } : null;
  };

  surveyName = new FormControl('', {
    validators: [Validators.required, Validators.minLength(4), Validators.pattern(/\S/)]
  });

  surveyEndDate = new FormControl('', {
    validators: [this.notInPast]
  });

  surveyQuestions = new FormControl('', {
    validators: [Validators.minLength(6), Validators.pattern(/\S/)]
  });

  surveyAnswer = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2), Validators.pattern(/\S/)]
  });

  surveyDescription = new FormControl('', {
    validators: [Validators.required, Validators.minLength(10), Validators.pattern(/\S/)]
  });

  checkEndDate() {
    if (!this.surveyEndDate.value) {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
      this.surveyEndDate.setValue(this.formatDate(tomorrow));
    }
  }

  async updateInput() {

    this.checkEndDate();

    const newSurvey: SurveyCreate = {
      id: Date.now(),
      name: this.surveyName.value ?? '',
      category: this.dropDown.choose,
      endDate: this.surveyEndDate.value ?? '',
      description: this.surveyDescription.value ?? '',
      questions: this.questions.value
    };

    await this.surveyCreateService.addSurvey(newSurvey);
    this.surveyCreateService.closeCreateSurvey();
    this.surveyCreateService.showSuccessOverlay.set(true);

    this.surveyName.setValue('');
    this.surveyEndDate.setValue('');
    this.surveyDescription.setValue('');
  }

  deleteInput(control: FormControl) {
    control.setValue('');
  }

  questions = new FormArray([
    this.createQuestion()
  ]);

  createQuestion(): FormGroup {
    return new FormGroup({
      questionText: new FormControl('', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(50)]),
        allowMultiple: new FormControl(false),
      answers: new FormArray([
        new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
        new FormControl('', [Validators.required, Validators.pattern(/\S/)])
      ])
    });
  }

  addQuestion() {
    if (this.canAddQuestion) {
      this.questions.push(this.createQuestion());
    }
  }
  get canAddQuestion(): boolean {
    return this.questions.length < this.maxQuestions;
  }

  deleteQuestion(qIndex: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(qIndex);
    } else {
      this.questions.setControl(0, this.createQuestion());
    }
  }

  addAnswer(qIndex: number) {
    const answers = this.getAnswers(qIndex);
    if (answers.length < this.maxAnswers) {
      answers.push(new FormControl('', [Validators.required, Validators.pattern(/\S/)]));
    }
  }

  deleteAnswer(qIndex: number, aIndex: number) {
    const answers = this.getAnswers(qIndex);

    if (aIndex < this.minAnswers) {
      answers.at(aIndex).setValue('');
    } else {
      answers.removeAt(aIndex);
    }
  }

  getAnswers(qIndex: number): FormArray {
    return this.questions.at(qIndex).get('answers') as FormArray;
  }

  getAllowMultiple(qIndex: number): FormControl {
    return this.questions.at(qIndex).get('allowMultiple') as FormControl;
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  canAddAnswer(qIndex: number): boolean {
    return this.getAnswers(qIndex).length < this.maxAnswers;
  }

  showErrors = false;   // ← erst nach dem ersten Klick Fehler zeigen

 // ================================================
// FEHLERLISTE
// ================================================

getErrors(): string[] {
  return [
    ...this.getNameErrors(),
    ...this.getCategoryErrors(),
    ...this.getDateErrors(),
    ...this.getQuestionErrors(),
  ];
}

private getNameErrors(): string[] {
  if (this.surveyName.hasError('required')) return ['Survey name is required.'];
  if (this.surveyName.hasError('pattern')) return ['Survey name cannot contain only spaces.'];
  if (this.surveyName.hasError('minlength')) return ['Survey name needs at least 4 characters.'];
  return [];
}

private getCategoryErrors(): string[] {
  return this.dropDown.choose === 'Choose categorie' ? ['Please choose a category.'] : [];
}

private getDateErrors(): string[] {
  return this.surveyEndDate.hasError('pastDate') ? ['The end date cannot be in the past.'] : [];
}

private getQuestionErrors(): string[] {
  const errors: string[] = [];

  this.questions.controls.forEach((question, qi) => {
    errors.push(...this.getQuestionTextErrors(question.get('questionText'), qi + 1));
    errors.push(...this.getAnswerErrors(qi));
  });

  return errors;
}

private getQuestionTextErrors(control: AbstractControl | null, nr: number): string[] {
  if (control?.hasError('required')) return [`Question ${nr}: Please enter a question.`];
  if (control?.hasError('pattern')) return [`Question ${nr}: The question cannot contain only spaces.`];
  if (control?.hasError('maxlength')) return [`Question ${nr}: The question can have a maximum of 50 characters.`];
  return [];
}

private getAnswerErrors(qi: number): string[] {
  const errors: string[] = [];

  this.getAnswers(qi).controls.forEach((answer, ai) => {
    const label = `Question ${qi + 1}: Answer ${this.getLetter(ai)}`;

    if (answer.hasError('required')) errors.push(`${label} is empty.`);
    else if (answer.hasError('pattern')) errors.push(`${label} cannot contain only spaces.`);
  });

  return errors;
}

  

  // Klick auf Publish
  onPublishClick() {
    if (this.canPublish()) {
      this.showErrors = false;
      this.updateInput();
    } else {
      this.showErrors = true;
      this.surveyName.markAsTouched();     // ← Felder rot markieren
      this.questions.markAllAsTouched();
    }
  }
}
