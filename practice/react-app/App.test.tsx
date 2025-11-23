/* @vitest-environment jsdom */

import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import type { CharacterListResponse } from './api/api-client-generated';
import App from './App';

const getCharactersMock = vi.hoisted(() => vi.fn());

vi.mock('./api/api-client-generated', async () => {
  const actual =
    await vi.importActual<typeof import('./api/api-client-generated')>(
      './api/api-client-generated'
    );

  return {
    ...actual,
    DefaultApi: vi.fn(() => ({
      getCharacters: getCharactersMock,
    })),
  };
});

const createClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const renderApp = () =>
  render(
    <QueryClientProvider client={createClient()}>
      <App />
    </QueryClientProvider>
  );

describe('Rick and Morty characters', () => {
  beforeEach(() => {
    getCharactersMock.mockResolvedValue({
      data: {
        info: { count: 2, pages: 1 },
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            origin: { name: 'Earth (C-137)' },
            location: { name: 'Citadel of Ricks' },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          },
          {
            id: 2,
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            origin: { name: 'unknown' },
            location: { name: 'Earth (Replacement Dimension)' },
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          },
        ],
      } satisfies CharacterListResponse,
    });
  });

  afterEach(() => {
    getCharactersMock.mockReset();
  });

  test('renders characters from the API client', async () => {
    renderApp();

    expect(screen.getByText(/ładuję postacie/i)).toBeInTheDocument();

    const list = await screen.findByRole('list', { name: /lista bohaterów/i });
    const items = within(list).getAllByRole('listitem');

    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Rick Sanchez');
    expect(items[1]).toHaveTextContent('Morty Smith');
  });

  test('shows an error when fetching characters fails', async () => {
    getCharactersMock.mockRejectedValueOnce(new Error('Network unavailable'));

    renderApp();

    expect(
      await screen.findByText(/nie udało się pobrać danych/i)
    ).toBeInTheDocument();
  });
});
