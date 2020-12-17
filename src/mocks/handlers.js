import { rest } from 'msw';
import data from './articles.json';

export const handlers = [
  rest.get('https://my-app.dev/articles', (req, res, ctx) => {
    const scenario = sessionStorage.getItem('@scenario:articles');
    switch (scenario) {
      case 'empty':
        return res(ctx.status(200), ctx.json({ data: [] }));
      case 'success':
      default:
        return res(ctx.status(200), ctx.json(data));
    }
  }),
];
