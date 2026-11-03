import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { OverlayComponent } from './pages/create-survey/overlay/overlay.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { SurveyCreateService } from './service/survey-create.service.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, OverlayComponent, CreateSurveyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  surveyCreateService = inject(SurveyCreateService);
  title = 'poll_app';

  constructor() {
    effect(() => {
      const modalOpen =
        this.surveyCreateService.showCreateSurvey() ||
        this.surveyCreateService.showSuccessOverlay();

      document.body.style.overflow = modalOpen ? 'hidden' : '';
    });
  }
}
