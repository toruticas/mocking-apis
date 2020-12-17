import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { server } from './mocks/server';
import { cache } from 'swr';

beforeAll(() => server.listen());
afterEach(() => {
  cache.clear();
  server.resetHandlers();
});
afterAll(() => server.close());

test('renders page articles', async () => {
  render(<App />);
  expect(screen.getByText(/List of articles/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Feature Toggle/i)).toBeInTheDocument();
    expect(screen.getByText(/React Suspense \+ SWR \+ Skeleton/i)).toBeInTheDocument();
    expect(screen.getByText(/Migrating from JS to TS \(CRA\)/i)).toBeInTheDocument();
  });
});

test('renders empty list', async () => {
  sessionStorage.setItem('@scenario:articles', 'empty');
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Articles list is empty/i)).toBeInTheDocument();
  });
});
