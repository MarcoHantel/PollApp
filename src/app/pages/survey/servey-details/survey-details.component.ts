import { Component, inject, signal, OnDestroy } from '@angular/core';
import { SurveyCreateService } from '../../../service/survey-create.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyCreate } from '../../../interfaces/survey-create.model';

@Component({
  selector: 'app-survey-details',
  imports: [],
  templateUrl: './survey-details.component.html',
  styleUrl: './survey-details.component.scss'
})
export class SurveyDetailsComponent implements OnDestroy {   

  surveyCreateService = inject(SurveyCreateService);
  route = inject(ActivatedRoute);
  router = inject(Router);                                     

  survey = signal<SurveyCreate | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.surveyCreateService.loadSurveys().then(() => {
      const found = this.surveyCreateService.surveys().find(s => s.id === id);
      if (found) {
        this.survey.set(found);
        this.surveyCreateService.loadVotes(id);               
        this.surveyCreateService.subscribeToVotes(id);       
      }
    });
  }

  ngOnDestroy() {
    this.surveyCreateService.unsubscribeVotes();
    this.surveyCreateService.selectedAnswers.set({});
  }

  isSurveyActive(): boolean {
    if (!this.survey()) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(this.survey()!.endDate) >= today;
  }


  async completeSurvey() {
    if (!this.survey() || !this.isSurveyActive()) return;

    const success = await this.surveyCreateService.submitVotes(this.survey()!);
    if (success) {
      this.router.navigate(['']);
    }
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
}