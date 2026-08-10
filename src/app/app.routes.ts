import { Routes } from '@angular/router';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';

export const routes: Routes = [

    { path:'', component: LandingpageComponent },

    { path:'create-survey', component: CreateSurveyComponent}

];
