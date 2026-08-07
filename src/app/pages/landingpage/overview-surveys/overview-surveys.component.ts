import { Component, inject, } from '@angular/core';
import { DisplySurveyService } from './../../../service/disply-survey.service';


@Component({
  selector: 'app-overview-surveys',
  imports: [],
  templateUrl: './overview-surveys.component.html',
  styleUrl: './overview-surveys.component.scss'
})
export class OverviewSurveysComponent {

  private surveyService = inject(DisplySurveyService);
  currentSurveys = this.surveyService.getEndingSoonSurveys();

  isOpen = false;  
  selected = 'Sort by categories'; // default value für den Anfang

  options = [
    { value: 'all', label: 'All Surveys' },
    { value: 'team', label: 'Team Activities' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'gaming', label: 'Gaming & Entertainment' },
    { value: 'education', label: 'Education & Learning' },
    { value: 'lifestyle', label: 'Lifestyle & Preferences' },
    { value: 'tech', label: 'Technology & Innovation' }
  ]

  selectOption(option: { value: string; label: string }) {
    this.selected = option.label;  // ← selected setzen
    this.isOpen = false;           // ← Dropdown schließen
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;  // ← togglen!
  }
}
