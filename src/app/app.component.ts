// import { Component, inject } from '@angular/core';
// import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

// import { HeaderComponent } from './shared/header/header.component';
// import { OverlayComponent } from './pages/create-survey/overlay/overlay.component'; 
// import { SurveyCreateService } from './service/survey-create.service.service';


// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, HeaderComponent, OverlayComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   surveyCreateService = inject(SurveyCreateService);
//   title = 'poll_app';
//   router = inject(Router);

//   constructor() {
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         document.body.style.backgroundColor = event.url.includes('create-survey')
//           ? 'white'
//           : '';  
//       }
//     });
//   }
// }

import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { OverlayComponent } from './pages/create-survey/overlay/overlay.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component'; // ← NEU
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