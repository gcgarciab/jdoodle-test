import { setupServer, type SetupServer } from 'msw/node';
import { handlers } from './handlers';
// enable the mock API for tests
export const server: SetupServer = setupServer(...handlers);