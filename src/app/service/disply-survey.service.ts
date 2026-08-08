import { Injectable, Input } from '@angular/core';
import { Survey } from '../interfaces/survey.model';

// export interface Survey {
//   id: number;
//   category: string;
//   title: string;
//   expire: number;
//   active: boolean;
// }

@Injectable({
  providedIn: 'root'
})
export class DisplySurveyService {

  surveys: Survey[] = [];

  constructor() {
    this.surveys = [
      { id: 1, category: "Team Activities", title: "Das ist der Title", expire: 2, active: true },
      { id: 2, category: "Health & Wellness", title: "Sport ist gesund", expire: 5, active: false },
      { id: 3, category: "Gaming & Entertainment", title: "Was ist dein Lieblingsessen?", expire: 3, active: true },
      { id: 4, category: "Team Activities", title: "Was ist deine Lieblingsparty?", expire: 1, active: true },
      { id: 5, category: "Technology & Innovation", title: "Was ist deine Lieblingsmusik?", expire: 4, active: false },
    ];
  }

  // Metode um die Umfrage zu sortieren und die 3 Umfragen mit dem kürzesten Ablaufdatum zurückzugeben
  getEndingSoonSurveys(limit: number = 3): Survey[] {
    return [...this.surveys]
      .sort((a, b) => a.expire - b.expire)
      .slice(0, limit);
  }

  // neue Funktion für alle Surveys
  getAllSurveys(): Survey[] {
    return [...this.surveys]
  }

}