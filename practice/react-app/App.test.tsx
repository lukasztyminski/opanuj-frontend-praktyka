/* @vitest-environment jsdom */

import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const createClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const renderApp = () => {
  const queryClient = createClient();
  const user = userEvent.setup();

  const view = render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  return { user, ...view };
};

describe('Books app', () => {
  test('renders initial books from React Query cache', () => {
    renderApp();

    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');

    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Clean Code');
    expect(items[1]).toHaveTextContent('Domain-Driven Design');
  });

  test('adds a new book and shows it in the UI', async () => {
    const { user } = renderApp();

    await user.type(screen.getByLabelText('Tytuł książki'), 'Rework');
    await user.type(screen.getByLabelText('Autor książki'), 'Jason Fried');
    await user.click(screen.getByRole('button', { name: /dodaj książkę/i }));

    expect(await screen.findByText('Rework')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('removes a book from the UI', async () => {
    const { user } = renderApp();

    await user.click(screen.getByRole('button', { name: /Usuń Clean Code/i }));

    expect(screen.queryByText('Clean Code')).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
