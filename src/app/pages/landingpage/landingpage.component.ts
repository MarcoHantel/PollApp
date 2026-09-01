import { Component } from '@angular/core';
import { NewSurveyComponent } from './new-survey/new-survey.component';
import { YourSurveyComponent } from './your-survey/your-survey.component';
import { OverviewSurveysComponent } from './overview-surveys/overview-surveys.component';


@Component({
  selector: 'app-landingpage',
  imports: [NewSurveyComponent, YourSurveyComponent, OverviewSurveysComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {


  
}
