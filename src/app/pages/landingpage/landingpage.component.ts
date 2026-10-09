// landingpage.component.ts
import { Component, inject } from '@angular/core'; // ← inject hinzufügen
import { NewSurveyComponent } from './new-survey/new-survey.component';
import { YourSurveyComponent } from './your-survey/your-survey.component';
import { OverviewSurveysComponent } from './overview-surveys/overview-surveys.component';
import { SurveyCreateService } from '../../service/survey-create.service.service'; // ← hinzufügen

@Component({
  selector: 'app-landingpage',
  imports: [NewSurveyComponent, YourSurveyComponent, OverviewSurveysComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {
  surveyCreateService = inject(SurveyCreateService); // ← hinzufügen

  constructor() {
    this.surveyCreateService.loadSurveys(); // ← Daten laden
  }
}