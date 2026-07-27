import { Component } from '@angular/core';
import { NewSurveyComponent } from './new-survey/new-survey.component';
import { YourSurveyComponent } from './your-survey/your-survey.component';

@Component({
  selector: 'app-landingpage',
  imports: [NewSurveyComponent, YourSurveyComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

}
