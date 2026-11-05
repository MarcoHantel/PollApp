import { Routes } from '@angular/router';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { SurveyDetailsComponent } from './pages/survey/servey-details/survey-details.component';


export const routes: Routes = [
    { path:'', component: LandingpageComponent },
    { path: 'survey-details/:id', component: SurveyDetailsComponent },

];
