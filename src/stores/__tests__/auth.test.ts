import type { AuthResponse } from '@/modules/auth/interfaces';
import { FAKE_AUTH_CREDENTIALS, FAKE_TOKENS } from '@/modules/auth/constants';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

describe('Auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Actions', () => {
    test('signIn', async () => {
      const authStore = useAuthStore();
      const tokensSpy = vi.spyOn(authStore, 'setTokens');
      expect(authStore.accessToken).toBe('');
      await authStore.signIn(FAKE_AUTH_CREDENTIALS);
      expect(tokensSpy).toHaveBeenCalledWith(FAKE_TOKENS);
      expect(authStore.accessToken).toBe(FAKE_TOKENS.accessToken);
    });

    test('setTokens', () => {
      const authStore = useAuthStore();
      authStore.reset(); // Reset
      expect(authStore.accessToken).toBe('');
      expect(authStore.refreshToken).toBe('');
      // Call method
      const data: AuthResponse = { ...FAKE_TOKENS };
      authStore.setTokens(data);
      expect(authStore.accessToken).toBe(data.accessToken);
      expect(authStore.refreshToken).toBe(data.refreshToken);
    });

    test('reset', () => {
      const authStore = useAuthStore();
      authStore.$patch({ currentUser: 'Camilo' });
      expect(authStore.currentUser).toBe('Camilo');
      // Call reset
      authStore.reset();
      expect(authStore.currentUser).toBe('');
      expect(authStore.$state).toMatchObject(INITIAL_AUTH_STATE);
    });

    test('signOut', () => {
      const authStore = useAuthStore();
      const examStore = useExamStore();
      const localStorageSpy = vi.spyOn(Storage.prototype, 'clear');
      const resetAuthSpy = vi.spyOn(authStore, 'reset');
      const resetExamSpy = vi.spyOn(examStore, 'reset');
      authStore.signOut();
      expect(localStorageSpy).toHaveBeenCalled();
      expect(resetAuthSpy).toHaveBeenCalled();
      expect(resetExamSpy).toHaveBeenCalled();
    });
  });
});
