import type { AuthState } from '../interfaces';

export const INITIAL_AUTH_STATE: AuthState = {
  currentUser: '',
  accessToken: '',
  refreshToken:  '',
};