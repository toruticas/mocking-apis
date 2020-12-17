import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import data from './articles.json';

beforeAll(() => jest.spyOn(window, 'fetch'));

test('renders page articles', async () => {
  window.fetch.mockResolvedValue({
    ok: true,
    json: async () => data,
  });

  render(<App />);
  expect(screen.getByText(/List of articles/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Feature Toggle/i)).toBeInTheDocument();
    expect(screen.getByText(/React Suspense \+ SWR \+ Skeleton/i)).toBeInTheDocument();
    expect(screen.getByText(/Migrating from JS to TS \(CRA\)/i)).toBeInTheDocument();
  });
});
