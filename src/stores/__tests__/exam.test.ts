import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { INITIAL_EXAM_STATE, FAKE_JDOODLE_CREDENTIALS } from '@/modules/exam/constants';

describe('Exam store', () => {
  const examStore = useExamStore();

  beforeEach(() => {
    examStore.reset();
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Getters', () => {
    test('currentQuestion', () => {
      expect(examStore.currentQuestion).toBeNull();
      // Update questions
      examStore.selectQuestions();
      const { questions, currentIndex, currentQuestion } = examStore;
      expect(currentQuestion).toMatchObject(questions[currentIndex]);
    });

    test('isPracticeExam', () => {
      expect(examStore.isPracticeExam).toBeFalsy();
      // Update examType
      examStore.setExamType(ExamEnum.PRACTICE);
      expect(examStore.isPracticeExam).toBeTruthy();
    });
  });

  describe('Actions', () => {
    test('selectQuestions', () => {
      expect(examStore.questions.length).toBe(0);
      examStore.selectQuestions();
      expect(examStore.questions.length).toBe(5);
    });

    test('validateScript', async () => {
      const data = {
        clientId: "id",
        clientSecret: "secret",
        language: "typescript",
        script: "const x: number = 10;\nconst y: number = 25;\nconst z: number = x + y;\n\nconsole.log(\"Sum of x+ y = \" + z);\n",
        versionIndex: "0",
      };

      const result = await examStore.validateScript(data);
      expect(result).toMatchObject(SCRIPT_RESULT);
    });

    test('getJDoodleToken', async () => {
      expect(examStore.jdoodleToken).toBe('');
      await examStore.getJDoodleToken(FAKE_JDOODLE_CREDENTIALS);
      expect(examStore.jdoodleToken).toBe('fakeToken');
    });

    test('setExamType', () => {
      expect(examStore.examType).toBeNull();
      examStore.setExamType(ExamEnum.TEST);
      expect(examStore.examType).toBe(ExamEnum.TEST);
    });

    test('setExamId', () => {
      expect(examStore.examId).toBeNull();
      examStore.setExamId(12);
      expect(examStore.examId).toBe(12);
    });

    test('resetQuestionsStatus', async () => {
      // Update Question Status
      examStore.selectQuestions();
      const [firstQuestion] = examStore.questions;
      // Update first testCase status
      firstQuestion.testCases[0].status = true;
      expect(firstQuestion.testCases[0].status).toBeTruthy();
      // Make reset
      examStore.resetQuestionsStatus();
      expect(examStore.questions[0].testCases[0].status).toBeFalsy();
    });

    test('reset', () => {
      examStore.setExamId(10);
      expect(examStore.examId).toBe(10);
      // Call reset
      examStore.reset();
      expect(examStore.examId).toBeNull();
      expect(examStore.$state).toMatchObject(INITIAL_EXAM_STATE);
    });
  });
});
