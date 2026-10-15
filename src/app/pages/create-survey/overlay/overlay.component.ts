import { Component, inject } from '@angular/core';
import { SurveyCreateService } from '../../../service/survey-create.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overlay',
  imports: [],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss'
})
export class OverlayComponent {
  surveyCreateService = inject(SurveyCreateService);
  router = inject(Router);

  closeOverlay() {
    this.surveyCreateService.showSuccessOverlay.set(false);

    const id = this.surveyCreateService.lastCreatedSurveyId();

    if (id) {
      this.router.navigate(['survey-details', id]); // ID!
    } else {
      this.router.navigate(['']); // ← Fallback zur Startseite
    }
  }
}