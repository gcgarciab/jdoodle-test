// import { delay, http, HttpHandler, HttpResponse } from 'msw';
import { RestHandler, rest } from 'msw';
import type { ScriptLocalBody } from '@/modules/exam/interfaces';

const examRequests = (msw: typeof rest) => [
  msw.post('/auth-token', (req, res, ctx) => res(ctx.text('fakeToken'))),

  msw.post('/execute', async (req, res, ctx) => {
    const data = await req.json() as ScriptLocalBody;

    return res(
      ctx.delay(1500),
      ctx.json({
        ...SCRIPT_RESULT,
        output: data.output ? data.output : SCRIPT_RESULT.output,
      })
    );
  }),
]

export const handlers: RestHandler[] = [...examRequests(rest)];

// !important - MSW v2 is failing - After check vue example, server faile with vitest 🥲
// https://github.com/mswjs/examples/tree/main/examples/with-vue (Check example to verify)

// export const handlers = [
  // http.post('/auth-token', () => {
  //   return HttpResponse.text('fakeToken');
  // }),

  // http.post('/execute', async ({ request }) => {
  //   const data = await request.json() as ScriptLocalBody;
  //   // Adding delay
  //   await delay(1500);

  //   return HttpResponse.json({
  //     ...SCRIPT_RESULT,
  //     output: data.output ? data.output : SCRIPT_RESULT.output,
  //   });
  // }),
// ];

export default handlers;
