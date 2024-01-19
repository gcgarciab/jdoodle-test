import router from '@/router';
import ExamResultView from '@/modules/exam/views/ExamResultView.vue';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

describe('ExamResultView', () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = shallowMount(ExamResultView);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Functions', () => {
    test('goToHome', async () => {
      const routerSpy = vi.spyOn(router, 'push');
      const resetSpy = vi.spyOn(wrapper.vm.examStore, 'reset');
      // Calls method
      await wrapper.vm.goToHome();
      // expect(delaySpy).toHaveBeenCalled();
      expect(resetSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith({ name: 'Home' });
    });

    test('retryTest', async () => {
      // Set value to examId
      const routerSpy = vi.spyOn(router, 'push');
      const resetQuestionSpy = vi.spyOn(wrapper.vm.examStore, 'resetQuestionsStatus');
      wrapper.vm.examStore.setExamId(4);
      // Calls method
      await wrapper.vm.retryTest();
      expect(resetQuestionSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith({ name: 'ExamPractice', params: { id: 4 } });
    });

    // TODO: Check how to mock quasar plugins !
    // test('checkQuestionsResult', () => {
    //   const notifySpy = vi.spyOn(showNotify, 'showNotify');
    //   // Set questions
    //   wrapper.vm.totalQuestions = 2;
    //   wrapper.vm.examStore.selectQuestions();
    //   // Set values to true
    //   wrapper.vm.questions = wrapper.vm.questions.map((q: Question) => ({
    //     ...q,
    //     testCases: q.testCases.map((t) => ({ ...t, status: true }))
    //   }));
    //   // Call method
    //   wrapper.vm.checkQuestionsResult();
    // });
  })
});