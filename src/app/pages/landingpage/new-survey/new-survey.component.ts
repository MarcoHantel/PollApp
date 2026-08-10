import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-new-survey',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './new-survey.component.html',
  styleUrl: './new-survey.component.scss'
})
export class NewSurveyComponent {

}
