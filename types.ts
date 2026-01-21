export interface LessonSection {
  title: string;
  content: string;
  codeSnippet?: {
    language: 'kotlin' | 'java' | 'xml';
    code: string;
    description?: string;
  };
  image?: string;
}

export interface Topic {
  id: string;
  title: string;
  category: 'OOP' | 'Kotlin' | 'Android System' | 'Android UI' | 'Connectivity';
  description: string;
  sections: LessonSection[];
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export enum ViewMode {
  LEARN = 'LEARN',
  QUIZ = 'QUIZ',
  SIMULATION = 'SIMULATION'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}