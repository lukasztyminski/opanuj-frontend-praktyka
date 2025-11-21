import type { Book } from '../types/Book';

interface BookListProps {
  books: Book[];
  onRemove: (id: string) => void;
}

export function BookList({ books, onRemove }: BookListProps) {
  if (!books.length) {
    return <p className="text-sm text-slate-500">Lista jest pusta.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {books.map((book) => (
        <li
          className="flex items-center justify-between rounded border border-slate-200 bg-white px-4 py-3 shadow-sm"
          key={book.id}
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">{book.title}</p>
            <p className="text-xs text-slate-600">Autor: {book.author}</p>
          </div>
          <button
            aria-label={`Usuń ${book.title}`}
            className="rounded bg-rose-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-rose-700"
            onClick={() => onRemove(book.id)}
            type="button"
          >
            Usuń
          </button>
        </li>
      ))}
    </ul>
  );
}
