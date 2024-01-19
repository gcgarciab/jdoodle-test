import router from '@/router';
import ExamView from '@/modules/exam/views/ExamView.vue';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

describe('ExamView', () => {
  let wrapper: any;
  const script = 'console.log("test");'

  beforeEach(async () => {
    wrapper = shallowMount(ExamView);
    await wrapper.vm.beforeMount();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Functions', () => {
    test('buildScriptBody', () => {
      // Build result
      const result = {
        ...wrapper.vm.jdoodleCredentials,
        language: 'typescript',
        versionIndex: '0',
        script,
      };
      // Check result
      expect(wrapper.vm.buildScriptBody(script)).toMatchObject(result);
    });

    test('resetExamValues', () => {
      // Update values
      wrapper.vm.runningScript = true;
      wrapper.vm.executionResult = { ...SCRIPT_RESULT };
      wrapper.vm.currentExecution = ExamEnum.PRACTICE;
      expect(wrapper.vm.runningScript).toBeTruthy();
      expect(wrapper.vm.executionResult).toMatchObject(SCRIPT_RESULT);
      expect(wrapper.vm.currentExecution).toBe(ExamEnum.PRACTICE);
      // Call method
      wrapper.vm.resetExamValues();
      expect(wrapper.vm.runningScript).toBeFalsy();
      expect(wrapper.vm.executionResult).toBe(undefined);
      expect(wrapper.vm.currentExecution).toBe(undefined);
    });

    test('goToRoute', async () => {
      const routerSpy = vi.spyOn(router, 'push');
      const resetSpy = vi.spyOn(wrapper.vm.examStore, 'reset');
      // Call method
      await wrapper.vm.goToRoute('ExamResult');
      expect(routerSpy).toHaveBeenCalledWith({ name: 'ExamResult' });
      // Leave
      await wrapper.vm.goToRoute('Home', true);
      expect(resetSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith({ name: 'Home' });
    });

    test('testScript', async () => {
      const validateSpy = vi.spyOn(wrapper.vm.examStore, 'validateScript');
      await wrapper.vm.examStore.validateScript(script);
      expect(validateSpy).toHaveBeenCalled();
    });

    test('submitScript', async () => {
      // Rigth test to avoid Quasar error
      console.log(wrapper.vm.stopCountDown);
      const sliceSpy = vi.spyOn(Array.prototype, 'slice');
      const replaceSpy = vi.spyOn(String.prototype, 'replace');
      const validateSpy = vi.spyOn(wrapper.vm.examStore, 'validateScript');
      expect(wrapper.vm.stopCountDown).toBeFalsy();
      wrapper.vm.totalQuestions = 1;
      wrapper.vm.examStore.selectQuestions();
      // Get number and build script
      const { testMethod } = wrapper.vm.questions[0];
      const fakeScript = `function(${testMethod}) {}; console.log(${testMethod}([1,2,3]));`;
      await wrapper.vm.submitScript(fakeScript);
      expect(sliceSpy).toHaveBeenCalled();
      expect(replaceSpy).toHaveBeenCalled();
      expect(wrapper.vm.stopCountDown).toBeTruthy();
      expect(validateSpy).toHaveBeenCalledTimes(wrapper.vm.questions[0].testCases.length);
    });

    test('beforeMount', async () => {
      const selectSpy = vi.spyOn(wrapper.vm.examStore, 'selectQuestions');
      const tokenSpy = vi.spyOn(wrapper.vm.examStore, 'getJDoodleToken');
      // Call method
      await wrapper.vm.beforeMount();
      expect(tokenSpy).toHaveBeenCalled();
      expect(wrapper.vm.showCountDown).toBeTruthy();
      expect(selectSpy).not.toHaveBeenCalled();
      // Select questions
      wrapper.vm.totalQuestions = 2;
      await wrapper.vm.beforeMount();
      expect(selectSpy).toHaveBeenCalled();
      expect(wrapper.vm.questions.length).toBe(2);
    });
  })
});