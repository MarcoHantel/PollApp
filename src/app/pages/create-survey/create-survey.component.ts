import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { CategoryDropdownService } from '../../service/category-dropdown.service';
import { RouterLink } from "@angular/router";
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
  surveyCreateService = inject(SurveyCreateService);
  private dropDownService = inject(CategoryDropdownService)
  dropDown = this.dropDownService

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
    validators: [Validators.required, Validators.minLength(6), Validators.pattern(/\S/)]
  });

  surveyAnswer = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2), Validators.pattern(/\S/)]
  });

  surveyDescription = new FormControl('', {
    validators: [Validators.required, Validators.minLength(10), Validators.maxLength(500), Validators.pattern(/\S/)]
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
      questionText: new FormControl(''),
      allowMultiple: new FormControl(false),
      answers: new FormArray([
        new FormControl(''),
        new FormControl('')
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
      answers.push(new FormControl(''));
    }
  }

// deleteAnswer(qIndex: number, aIndex: number) {
//   const answers = this.getAnswers(qIndex);

//   if (answers.length > 1) {
//     answers.removeAt(aIndex);         
//   } else {
//     answers.at(aIndex).setValue('');   
//   }
// }


deleteAnswer(qIndex: number, aIndex: number) {
  const answers = this.getAnswers(qIndex);

  if (aIndex < this.minAnswers) {
    answers.at(aIndex).setValue('');   // ← A und B: nur Inhalt leeren
  } else {
    answers.removeAt(aIndex);          // ← ab C: Feld komplett entfernen
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
}
