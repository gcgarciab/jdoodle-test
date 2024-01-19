import type { AuthResponse } from '@/modules/auth/interfaces';
import { FAKE_AUTH_CREDENTIALS, FAKE_TOKENS } from '@/modules/auth/constants';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

describe('Auth store', () => {
  const authStore = useAuthStore();

  beforeEach(() => {
    authStore.reset();
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Actions', () => {
    test('signIn', async () => {
      const tokensSpy = vi.spyOn(authStore, 'setTokens');
      expect(authStore.accessToken).toBe('');
      await authStore.signIn(FAKE_AUTH_CREDENTIALS);
      expect(tokensSpy).toHaveBeenCalledWith(FAKE_TOKENS);
      expect(authStore.accessToken).toBe(FAKE_TOKENS.accessToken);
    });

    test('setTokens', () => {
      expect(authStore.accessToken).toBe('');
      expect(authStore.refreshToken).toBe('');
      // Call method
      const data: AuthResponse = { ...FAKE_TOKENS };
      authStore.setTokens(data);
      expect(authStore.accessToken).toBe(data.accessToken);
      expect(authStore.refreshToken).toBe(data.refreshToken);
    });

    test('reset', () => {
      authStore.$patch({ currentUser: 'Camilo' });
      expect(authStore.currentUser).toBe('Camilo');
      // Call reset
      authStore.reset();
      expect(authStore.currentUser).toBe('');
      expect(authStore.$state).toMatchObject(INITIAL_AUTH_STATE);
    });

    test('signOut', () => {
      const newStore = useAuthStore();
      const examStore = useExamStore();
      const localStorageSpy = vi.spyOn(Storage.prototype, 'clear');
      const resetAuthSpy = vi.spyOn(newStore, 'reset');
      const resetExamSpy = vi.spyOn(examStore, 'reset');
      newStore.signOut();
      expect(localStorageSpy).toHaveBeenCalled();
      expect(resetAuthSpy).toHaveBeenCalled();
      expect(resetExamSpy).toHaveBeenCalled();
    });
  });
});
