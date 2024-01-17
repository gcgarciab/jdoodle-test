import { defineStore } from 'pinia';
import { shuffleList } from '@/common/utils';
import { QUESTIONS } from '@/common/constants';
import type { AuthCredentials, ExamState, ScriptBody, ScriptResponse } from '@/common/interfaces';
import { requests } from '@/plugins';

export const useExamStore = defineStore('exam', {
  state: (): ExamState => ({
    questions: [],
    currentIndex: 0,
    currentLanguage: 'typescript',
    jdoodleToken: '',
  }),

  getters: {
    examProgress: (state) => state.currentIndex / state.questions.length,

    currentQuestion: (state) => {
      if (!state.questions.length) return null;

      return state.questions[state.currentIndex];
    }
  },

  actions: {
    selectQuestions() {
      const shuffledQuestions = shuffleList(QUESTIONS);
      // Select first 5 items
      this.questions = shuffledQuestions.slice(0, 5);
    },

    async validateScript(data: ScriptBody): Promise<ScriptResponse> {
      const result: ScriptResponse = await requests.post('/execute', data);
      return result;
    },

    async getJDoodleToken(credentials: AuthCredentials) {
      this.jdoodleToken = await requests.post('/auth-token', credentials);
      console.log('token', this.jdoodleToken);
    },
  },
});

export default useExamStore;
