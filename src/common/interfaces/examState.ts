import type { CodeLanguage } from '@/common/types';
import type { Question } from '@/common/interfaces';

export interface ExamState {
  questions: Question[];
  currentIndex: number;
  currentLanguage: CodeLanguage;
  jdoodleToken: string;
}