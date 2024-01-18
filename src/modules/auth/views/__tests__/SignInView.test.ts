import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import SignInView from '@/modules/auth/views/SignInView.vue';
import { shallowMount } from '@vue/test-utils';
import router from '@/router';

vi.mock('@/common/composables', () => ({
  useLoading: () => ({
    startLoading: () => vi.fn(),
    stopLoading: () => vi.fn(),
  })
}));

describe('SignInView', () => {
  let wrapper: any;

  beforeAll(() => {
    localStorage.clear();
  });

  beforeEach(async () => {
    wrapper = shallowMount(SignInView);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Functions', () => {
    test('signIn', async () => {
      // Invalid form
      const touchSpy = vi.spyOn(wrapper.vm.v$, '$touch');
      await wrapper.vm.signIn();
      expect(touchSpy).toHaveBeenCalled();
      // Valid form
      const routerSpy = vi.spyOn(router, 'push');
      // const startSpy = vi.spyOn(useLoading(), 'startLoading');
      const signInSpy = vi.spyOn(wrapper.vm.authStore, 'signIn');
      wrapper.vm.authForm.email = FAKE_AUTH_CREDENTIALS.email;
      wrapper.vm.authForm.password = FAKE_AUTH_CREDENTIALS.password;
      await wrapper.vm.signIn();
      // expect(startSpy).toHaveBeenCalled();
      expect(signInSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith({ name: 'Home' });
    });
  })
});
