// jest.setup.js
import { setupServer } from 'msw/node'
import { handlers } from '@/mocks/handlers'

const server = setupServer(...handlers);

beforeAll(() => {
  // Start the interception.
  server.listen({ onUnhandledRequest: 'error' });
})

afterEach(() => {
  // Remove any handlers you may have added
  // in individual tests (runtime handlers).
  server.resetHandlers();
})

afterAll(() => {
  // Disable request interception and clean up.
  server.close();
})

// import { server } from './mocks/server';

// beforeAll(() => {
//   // Set Camilo Admin tokens
//   localStorage.setItem('accessToken', '34567');
//   localStorage.setItem('refreshToken', '34567');
//   server.listen({ onUnhandledRequest: 'error' });
// });

// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());
