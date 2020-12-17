import { rest } from 'msw';
import data from './articles.json';

export const handlers = [
  rest.get('https://my-app.dev/articles', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  }),
];
