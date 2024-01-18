import type { ExamState } from '../interfaces';

export const INITIAL_EXAM_STATE: ExamState = {
  examId: null,
  questions: [],
  currentIndex: 0,
  currentLanguage: 'typescript',
  jdoodleToken: '',
  totalQuestions: 5,
  examType: null,
}
