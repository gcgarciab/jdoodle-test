import { delay, http, HttpHandler, HttpResponse } from 'msw';
import type { ScriptLocalBody } from '@/modules/exam/interfaces';

export const handlers: HttpHandler[] = [
  http.post('/auth-token', () => {
    return HttpResponse.text('fakeToken');
  }),

  http.post('/execute', async ({ request }) => {
    const data = await request.json() as ScriptLocalBody;
    // Adding delay
    await delay(1500);

    return HttpResponse.json({
      ...SCRIPT_RESULT,
      output: data.output ? data.output : SCRIPT_RESULT.output,
    });
  }),
];

export default handlers;
