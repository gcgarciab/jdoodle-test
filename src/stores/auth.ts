import { defineStore } from 'pinia';
import { delay, getStoreState } from '@/common/utils';
import type { AuthCredentials, AuthResponse, AuthState } from '@/common/interfaces';

const INITIAL_STATE: AuthState = {
  currentUser: '',
  accessToken: '',
  refreshToken:  '',
};

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => getStoreState('authStore', INITIAL_STATE),

  actions: {
    /**
     * Simulates SignIn request, set email value
     * to currentUser and calls 'setTokens' method
     * to save result data.
     * @param {AuthCredentials} credentials - User credentials
     */
    async signIn(credentials: AuthCredentials) {
      // const result = await requests.post('/sigin', credentials);
      await delay(1500);
      const result = {
        accessToken: 'adasdasdasdasd',
        refreshToken: 'adasdasdasdasd',
      };

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
     * Calls '$reset' method to clear store and
     * clear localStorage values.
     */
    async signOut(): Promise<void> {
      this.$reset();
      localStorage.clear();
    },
  },
});

export default useAuthStore;
