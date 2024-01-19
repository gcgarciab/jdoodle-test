import { FAKE_TOKENS, INITIAL_AUTH_STATE } from '@/modules/auth/constants';
import type { AuthCredentials, AuthResponse, AuthState } from '@/modules/auth/interfaces';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => getStoreState('authStore', INITIAL_AUTH_STATE),

  actions: {
    /**
     * Simulates SignIn request, set email value
     * to currentUser and calls 'setTokens' method
     * to save result data.
     * @param {AuthCredentials} credentials - User credentials
     */
    async signIn(credentials: AuthCredentials) {
      await delay(1500);
      const result = { ...FAKE_TOKENS };
      this.currentUser = credentials.email;
      this.setTokens(result);
    },

    /**
     * Set user tokens to state and save the state
     * in LocalStorage.
     * @param {AuthResponse} data - User tokens
     */
    setTokens(data: AuthResponse): void {
      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;
      // Save data in localStorage
      localStorage.setItem('authStore', JSON.stringify(this.$state));
    },

    /**
     * Force state to initial data
     */
    reset() {
      this.$state = { ...INITIAL_AUTH_STATE };
    },

    /**
     * Calls '$reset' method to clear store and
     * clear localStorage values.
     */
    signOut(): void {
      const examStore = useExamStore();
      // Clear stores
      this.reset();
      examStore.reset();
      localStorage.clear();
    },
  },
});

export default useAuthStore;
