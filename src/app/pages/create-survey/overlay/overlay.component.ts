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
    this.surveyCreateService.showSuccessOverlay.set(false); // Overlay schließen
    this.router.navigate(['survey-details']);  }
}