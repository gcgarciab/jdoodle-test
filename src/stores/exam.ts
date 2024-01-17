import { defineStore } from 'pinia';
import { requests } from '@/plugins';
import { QUESTIONS } from '@/common/constants';
import { getStoreState, shuffleList } from '@/common/utils';
import type { AuthCredentials, ExamState, ScriptBody, ScriptResponse } from '@/common/interfaces';

const INITIAL_STATE: ExamState = {
  questions: [],
  currentIndex: 0,
  currentLanguage: 'typescript',
  jdoodleToken: '',
  totalQuestions: 5,
}

export const useExamStore = defineStore('exam', {
  state: (): ExamState => getStoreState('examStore', INITIAL_STATE),

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
      // Set value to questions
      this.questions = shuffledQuestions.slice(0, this.totalQuestions);
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
