import { defineStore } from 'pinia';
import { shuffleList } from '@/common/utils';
import { QUESTIONS } from '@/common/constants';
import type { AuthCredentials, ExamState, ScriptBody } from '@/common/interfaces';
import { requests } from '@/plugins';

export const useExamStore = defineStore('exam', {
  state: (): ExamState => ({
    questions: [],
    currentIndex: 1,
    currentLanguage: 'typescript',
    jdoodleToken: '',
  }),

  getters: {
    examProgress: (state) => state.currentIndex / state.questions.length,

    currentQuestion: (state) => {
      if (!state.questions.length) return null;

      return state.questions[state.currentIndex - 1];
    }
  },

  actions: {
    selectQuestions() {
      const shuffledQuestions = shuffleList(QUESTIONS);
      // Select first 5 items
      this.questions = shuffledQuestions.slice(0, 5);
    },

    async validateAnswer(data: ScriptBody) {
      const result = await requests.post('/execute', data);
      console.log(result);
    },

    async submitQuestion(data: string) {

    },

    async getJDoodleToken(credentials: AuthCredentials) {
      this.jdoodleToken = await requests.post('/auth-token', credentials);
      console.log('token', this.jdoodleToken);
    },
  },
});

export default useExamStore;
