import type { CodeLanguage } from '@/modules/exam/types';
import type { Question } from '@/modules/exam/interfaces';

export interface ExamState {
  questions: Question[];
  currentIndex: number;
  currentLanguage: CodeLanguage;
  jdoodleToken: string;
  totalQuestions: number;
}