import { Component, Input } from '@angular/core';

export interface Survey {
  category: string;
  title: string;
  expire: number;
}

@Component({
  selector: 'app-survey-card',
  imports: [],
  templateUrl: './survey-card.component.html',
  styleUrl: './survey-card.component.scss'
})
export class SurveyCardComponent {
  @Input({ required: true }) survey!: Survey;
}
