import type { CodeLanguage } from '@/modules/exam/types';
import type { Question } from '@/modules/exam/interfaces';
import type { ExamEnum } from '../enums';

export interface ExamState {
  examId: number | null;
  questions: Question[];
  currentIndex: number;
  currentLanguage: CodeLanguage;
  jdoodleToken: string;
  totalQuestions: number;
  examType: ExamEnum | null;
}