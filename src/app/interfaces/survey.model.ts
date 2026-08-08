// src/app/interfaces/survey.model.ts
export interface Survey {
    id: number;
    category: string;
    title: string;
    expire: number;
    active: boolean;
}