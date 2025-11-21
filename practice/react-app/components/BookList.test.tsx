import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookList } from './BookList';
import type { Book } from '../types/Book';

const sampleBooks: Book[] = [
  { id: 'clean-code', title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 'ddd', title: 'Domain-Driven Design', author: 'Eric Evans' },
];

describe('BookList', () => {
  test('renders list items with title and author', () => {
    render(<BookList books={sampleBooks} onRemove={vi.fn()} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText('Domain-Driven Design')).toBeInTheDocument();
    expect(screen.getByText(/Robert C\. Martin/)).toBeInTheDocument();
  });

  test('calls remove handler with book id', async () => {
    const handleRemove = vi.fn();
    const user = userEvent.setup();

    render(<BookList books={sampleBooks} onRemove={handleRemove} />);

    await user.click(screen.getByRole('button', { name: /usuń Clean Code/i }));
    expect(handleRemove).toHaveBeenCalledWith('clean-code');
  });

  test('shows empty state', () => {
    render(<BookList books={[]} onRemove={vi.fn()} />);
    expect(screen.getByText('Lista jest pusta.')).toBeInTheDocument();
  });
});
