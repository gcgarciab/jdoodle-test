import { ExamEnum } from '@/modules/exam/enums';
import type { ExamState, JDoodleCredentials, ScriptBody, ScriptResponse } from '@/modules/exam/interfaces';

const INITIAL_STATE: ExamState = {
  examId: null,
  questions: [],
  currentIndex: 0,
  currentLanguage: 'typescript',
  jdoodleToken: '',
  totalQuestions: 5,
  examType: null,
}

export const useExamStore = defineStore('exam', {
  state: (): ExamState => getStoreState('examStore', INITIAL_STATE),

  getters: {
    currentQuestion: (state) => {
      if (!state.questions.length) return null;

      return state.questions[state.currentIndex];
    },

    isPracticeExam: (state) => state.examType === ExamEnum.PRACTICE
  },

  actions: {
    /**
     * Choose randomly from QUESTION 'totalQuestions'
     * value and set the result to 'questions'.
     */
    selectQuestions() {
      const shuffledQuestions = shuffleList(QUESTIONS);
      // Set value to questions
      this.questions = shuffledQuestions.slice(0, this.totalQuestions);
    },

    /**
     * Make POST request to API to execute an script
     * and return its result.
     * @param {ScriptBody} data - Script data
     * @returns {ScriptResponse} - JDoodle response
     */
    async validateScript(data: ScriptBody, output?: number): Promise<ScriptResponse> {
      const result: ScriptResponse = await requests.post('/execute', {
        ...data,
        output,
      });

      return result;
    },

    /**
     * Make POST request to API to get user token to be
     * used to connect with Websocket
     * @param {JDoodleCredentials} credentials - JDoodle credentials
     */
    async getJDoodleToken(credentials: JDoodleCredentials): Promise<void> {
      this.jdoodleToken = await requests.post('/auth-token', credentials);
    },

    /**
     * Set new value to 'examType'.
     * @param {ExamEnum | null} type - Type value
     */
    setExamType(type: ExamEnum | null): void {
      this.examType = type;
    },

    /**
     * Set new value to 'examType'.
     * @param {number} type - Type value
     */
    setExamId(newId: number): void {
      this.examId = newId;
    },

    /**
     * Reset all status for every testCase from questions.
     */
    resetQuestionsStatus(): void {
      this.questions = this.questions.map((q) => ({
        ...q,
        testCases: q.testCases.map((t) => ({
          ...t,
          status: false,
        }))
      }));
    },

    /**
     * Force state to initial data
     */
    reset(): void {
      this.$state = { ...INITIAL_STATE };
    },
  },
});

export default useExamStore;
