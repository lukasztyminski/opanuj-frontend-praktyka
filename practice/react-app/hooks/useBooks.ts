import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Book } from '../types/Book';

const BOOKS_QUERY_KEY = ['books'];

const DEFAULT_BOOKS: Book[] = [
  { id: 'clean-code', title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 'ddd', title: 'Domain-Driven Design', author: 'Eric Evans' },
];

const makeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `book-${Date.now()}`;

export function useBooks() {
  const queryClient = useQueryClient();

  return useQuery<Book[]>({
    queryKey: BOOKS_QUERY_KEY,
    queryFn: () =>
      Promise.resolve(
        queryClient.getQueryData<Book[]>(BOOKS_QUERY_KEY) ?? DEFAULT_BOOKS
      ),
    initialData: DEFAULT_BOOKS,
    staleTime: Infinity,
  });
}

export function useAddBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Omit<Book, 'id'>) => ({ ...input, id: makeId() }),
    onSuccess: (book) => {
      queryClient.setQueryData<Book[]>(BOOKS_QUERY_KEY, (current = []) => [
        ...current,
        book,
      ]);
    },
  });
}

export function useRemoveBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookId: string) => bookId,
    onSuccess: (bookId) => {
      queryClient.setQueryData<Book[]>(BOOKS_QUERY_KEY, (current = []) =>
        current.filter((book) => book.id !== bookId)
      );
    },
  });
}
