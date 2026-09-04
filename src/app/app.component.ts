import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { OverlayComponent } from './pages/create-survey/overlay/overlay.component'; 
import { SurveyCreateService } from './service/survey-create.service.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, OverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  surveyCreateService = inject(SurveyCreateService);
  title = 'poll_app';
  router = inject(Router);

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        document.body.style.backgroundColor = event.url.includes('create-survey')
          ? 'white'
          : '';  // farbwechsel hintergrund wenn componente geändert wird
      }
    });
  }
}