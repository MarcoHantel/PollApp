
// survey-create.model.ts - alles in einer Datei
export interface Answer {
  text: string;
}

export interface Question {
  questionText: string;
  allowMultiple: boolean;
  answers: Answer[];
}

export interface SurveyCreate {
  id: number;
  name: string;
  category: string;
  endDate: string;
  description: string;
  active: boolean;
  questions: Question[];
}