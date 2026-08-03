import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplySurveyService {

  surveys: any[] = [];

  constructor() {

    this.surveys = [
      {
        subject: "Umfrage Laufen",
        title: "Das ist der Title",
        expire: 2
      },
      {
        subject: "Umfrage sport",
        title: "Sport ist gesund",
        expire: 5
      },
            {
        subject: "Umfrage zum Thema Essen",
        title: "Was ist dein Lieblingsessen?",
        expire: 3
      }

    ];

  }
}
