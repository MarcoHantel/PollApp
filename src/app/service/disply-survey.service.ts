// import { Injectable, Input } from '@angular/core';
// // import { Survey } from '../interfaces/survey.model';
// import { SurveyCreate } from '../interfaces/survey-create.model';


// @Injectable({
//   providedIn: 'root'
// })
// export class DisplySurveyService {

//   surveys: SurveyCreate[] = [];

//   constructor() {
//     this.surveys = [
//       { id: 1, category: "Team Activities", name: "Das ist der Title", description: "Dies ist die Beschreibung für die erste Umfrage.", expire: 2, active: true },
//       { id: 2, category: "Health & Wellness", name: "Sport ist gesund", description: "Dies ist die Beschreibung für die erste Umfrage.", expire: 5, active: false },
//       { id: 3, category: "Gaming & Entertainment", name: "Was ist dein Lieblingsfilm?", description: "Dies ist die Beschreibung für die erste Umfrage.", expire: 3, active: true },
//       { id: 4, category: "Team Activities", name: "Was ist deine Lieblingsparty?", description: "Dies ist die Beschreibung für die erste Umfrage.", expire: 1, active: true },
//       { id: 5, category: "Technology & Innovation", name: "Was ist deine Lieblingsmusik?", description: "Dies ist die Beschreibung für die erste Umfrage.", expire: 4, active: false },
//       { id: 6, category: "Gaming & Entertainmenn", name: "Was ist das beste Brettspiel aller Zeiten?", description: "Dies ist die Beschreibung für die erste Umfrage.", expire: 4, active: false },
//       { id: 7, category: "Team Activities", name: "Die Besten Teamspiele aller Zeiten", description: "Dies ist die Beschreibung für die erste Umfrage.", expire: 2, active: false },
//     ];
//   }

//   // Metode um die Umfrage zu sortieren und die 3 Umfragen mit dem kürzesten Ablaufdatum zurückzugeben
//   getEndingSoonSurveys(limit: number = 3): SurveyCreate[] {
//     return [...this.surveys]
//       .sort((a, b) => a.expire - b.expire)
//       .slice(0, limit);
//   }

//   // neue Funktion für alle Surveys
//   getAllSurveys(): SurveyCreate[] {
//     return [...this.surveys]
//   }

// }
