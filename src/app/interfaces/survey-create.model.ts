
// survey-create.model.ts - alles in einer Datei
export interface Answer {
  id?: number; 
  text: string;
}

export interface Question {
  id?: number;
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
  questions: Question[];
}

