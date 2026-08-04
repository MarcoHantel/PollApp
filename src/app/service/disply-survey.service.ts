import { Injectable } from '@angular/core';

export interface Survey {
  id: number;
  subject: string;
  title: string;
  expire: number;
}

@Injectable({
  providedIn: 'root'
})
export class DisplySurveyService {

  surveys: Survey[] = [];

  constructor() {
    this.surveys = [
      { id: 1, subject: "Umfrage Laufen", title: "Das ist der Title", expire: 2 },
      { id: 2, subject: "Umfrage sport", title: "Sport ist gesund", expire: 5 },
      { id: 3, subject: "Umfrage zum Thema Essen", title: "Was ist dein Lieblingsessen?", expire: 3 },
      { id: 4, subject: "Umfrage Party", title: "Was ist deine Lieblingsparty?", expire: 1 },
    ];
  }

  // Metode um die Umfrage zu sortieren und die 3 Umfragen mit dem kürzesten Ablaufdatum zurückzugeben
  getEndingSoonSurveys(limit: number = 3): Survey[] {
    return [...this.surveys]
      .sort((a, b) => a.expire - b.expire)
      .slice(0, limit);
  }
}