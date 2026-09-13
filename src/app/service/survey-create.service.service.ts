import { Injectable, signal, computed } from '@angular/core';
import { SurveyCreate } from '../interfaces/survey-create.model';

@Injectable({ providedIn: 'root' })
export class SurveyCreateService {

  // Overlay
  showSuccessOverlay = signal(false);

  // Filter Signals
  selectedStatus = signal<'all' | 'active' | 'past'>('all');
  selectedCategory = signal('all');

  // aktuelle Survey in Bearbeitung
  currentSurvey = signal<SurveyCreate | null>(null);

  // alle Surveys mit Testdaten
  surveys = signal<SurveyCreate[]>([

    {
      id: 1,
      name: "Das ist der Title",
      category: "Team Activities",
      endDate: "2026-09-10",
      description: "Dies ist die Beschreibung.",
      active: true,
      questions: [
        {
          questionText: "Was ist dein Lieblingsfilm?",
          allowMultiple: true,        // ← fehlt bei dir!
          answers: [                   // ← fehlt bei dir!
            { text: "Inception" },
            { text: "The Matrix" },
          ]
        },
        {
          questionText: "Was ist dein Lieblingsessen?",
          allowMultiple: true,
          answers: [
            { text: "Pizza" },
            { text: "Sushi" },
            { text: "Burger" },
          ]
        }
      ]
    },


{ 
  id: 2, 
  name: "Sport ist gesund", 
  category: "Health & Wellness", 
  endDate: "2026-11-05", 
  description: "Wie sportlich bist du im Alltag?", 
  active: false, 
  questions: [
    {
      questionText: "Wie oft machst du Sport pro Woche?",
      allowMultiple: false,
      answers: [
        { text: "Nie" },
        { text: "1-2 mal" },
        { text: "3-4 mal" },
        { text: "Täglich" },
      ]
    }
  ] 
},
{ 
  id: 3, 
  name: "Was ist dein Lieblingsfilm?", 
  category: "Gaming & Entertainment", 
  endDate: "2026-09-01", 
  description: "Teile deinen Lieblingsfilm mit uns!", 
  active: true, 
  questions: [
    {
      questionText: "Welches Genre magst du am liebsten?",
      allowMultiple: false,
      answers: [
        { text: "Action" },
        { text: "Komödie" },
        { text: "Horror" },
        { text: "Drama" },
      ]
    },
    {
      questionText: "Wie oft gehst du ins Kino?",
      allowMultiple: false,
      answers: [
        { text: "Nie" },
        { text: "Selten" },
        { text: "Monatlich" },
        { text: "Wöchentlich" },
      ]
    },
    {
      questionText: "Welche Streaming Dienste nutzt du?",
      allowMultiple: true,
      answers: [
        { text: "Netflix" },
        { text: "Disney+" },
        { text: "Amazon Prime" },
        { text: "Apple TV+" },
      ]
    }
  ] 
},
{ 
  id: 4, 
  name: "Was ist deine Lieblingsparty?", 
  category: "Team Activities", 
  endDate: "2026-10-01", 
  description: "Lass uns die beste Party planen!", 
  active: true, 
  questions: [
    {
      questionText: "Welche Musik soll auf der Party laufen?",
      allowMultiple: true,
      answers: [
        { text: "Pop" },
        { text: "Hip-Hop" },
        { text: "Rock" },
        { text: "Electronic" },
      ]
    }
  ] 
},
{ 
  id: 5, 
  name: "Was ist deine Lieblingsmusik?", 
  category: "Technology & Innovation", 
  endDate: "2026-09-04", 
  description: "Teile deine Musikvorlieben!", 
  active: false, 
  questions: [
    {
      questionText: "Welches Genre hörst du am liebsten?",
      allowMultiple: false,
      answers: [
        { text: "Pop" },
        { text: "Rock" },
        { text: "Classical" },
        { text: "Jazz" },
      ]
    },
    {
      questionText: "Welchen Streaming Dienst nutzt du für Musik?",
      allowMultiple: false,
      answers: [
        { text: "Spotify" },
        { text: "Apple Music" },
        { text: "YouTube Music" },
        { text: "Tidal" },
      ]
    },
    {
      questionText: "Wie hörst du Musik am liebsten?",
      allowMultiple: false,
      answers: [
        { text: "Kopfhörer" },
        { text: "Lautsprecher" },
        { text: "Im Auto" },
        { text: "Live Konzerte" },
      ]
    }
  ] 
},
{ 
  id: 6, 
  name: "Was ist das beste Brettspiel aller Zeiten?", 
  category: "Gaming & Entertainment", 
  endDate: "2026-11-04", 
  description: "Welches Brettspiel begeistert dich?", 
  active: false, 
  questions: [
    {
      questionText: "Welche Art von Brettspielen magst du?",
      allowMultiple: true,
      answers: [
        { text: "Strategie" },
        { text: "Kooperativ" },
        { text: "Familienspiele" },
        { text: "Partyspiele" },
      ]
    },
    {
      questionText: "Wie lange darf ein Spiel dauern?",
      allowMultiple: false,
      answers: [
        { text: "Unter 30 Minuten" },
        { text: "30-60 Minuten" },
        { text: "1-2 Stunden" },
        { text: "Über 2 Stunden" },
      ]
    }
  ] 
},
{ 
  id: 7, 
  name: "Die Besten Teamspiele aller Zeiten", 
  category: "Team Activities", 
  endDate: "2026-09-03", 
  description: "Welche Teamspiele begeistern euch?", 
  active: false, 
  questions: [
    {
      questionText: "Wie viele Spieler soll das Spiel haben?",
      allowMultiple: false,
      answers: [
        { text: "2-4 Spieler" },
        { text: "5-8 Spieler" },
        { text: "9+ Spieler" },
      ]
    },
    {
      questionText: "Welche Teamspiele magst du?",
      allowMultiple: true,
      answers: [
        { text: "Werwolf" },
        { text: "Codenames" },
        { text: "Pictionary" },
        { text: "Escape Room" },
      ]
    },
    {
      questionText: "Wo spielt ihr am liebsten?",
      allowMultiple: false,
      answers: [
        { text: "Zuhause" },
        { text: "Im Büro" },
        { text: "Im Freien" },
        { text: "Im Restaurant" },
      ]
    }
  ] 
},]);

  // Survey hinzufügen
  addSurvey(survey: SurveyCreate) {
    this.surveys.update(list => [...list, survey]);
  }

  // Kategorie Filter setzen
  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  // Status Filter setzen
  setStatus(status: 'all' | 'active' | 'past') {
    this.selectedStatus.set(status);
  }

  // die 3 Surveys die am frühesten ablaufen
  getEndingSoonSurveys(limit: number = 3): SurveyCreate[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [...this.surveys()]
      .filter(s => new Date(s.endDate) >= today) // ← nur aktive
      .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()) // ← nach Datum sortieren
      .slice(0, limit); // ← nur die ersten 3
  }

  // gefilterte Surveys – reagiert automatisch auf Änderungen
  filteredSurveys = computed(() => {
    let result = this.surveys();

    // Kategorie Filter
    if (this.selectedCategory() !== 'all') {
      result = result.filter(s => s.category === this.selectedCategory());
    }

    // Status Filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.selectedStatus() === 'active') {
      result = result.filter(s => new Date(s.endDate) >= today);
    } else if (this.selectedStatus() === 'past') {
      result = result.filter(s => new Date(s.endDate) < today);
    }

    return result;
  });
}