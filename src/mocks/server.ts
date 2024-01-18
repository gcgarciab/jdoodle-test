import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/handlers';

// https://jskim1991.medium.com/react-unit-testing-apis-with-mock-service-works-msw-ca112ceddde9

// enable the mock API for tests
export const server = setupServer(...handlers);

export default server;