import { BookForm } from '../components/BookForm';
import { BookList } from '../components/BookList';
import { useAddBook, useBooks, useRemoveBook } from '../hooks/useBooks';

function BooksContainer() {
  const { data: books = [] } = useBooks();
  const addBook = useAddBook();
  const removeBook = useRemoveBook();

  const handleAdd = (title: string, author: string) => {
    addBook.mutate({ title, author });
  };

  const handleRemove = (id: string) => {
    removeBook.mutate(id);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 bg-slate-50 px-6 py-10">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
          React Query + RTL
        </p>
        <h1 className="text-2xl font-bold text-slate-900">
          Lista książek z lokalnym stanem
        </h1>
        <p className="text-sm text-slate-600">
          Dodawaj i usuwaj pozycje, a testy odzwierciedlają zmiany w interfejsie.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[1fr,1fr]">
        <BookForm onSubmit={handleAdd} isSubmitting={addBook.isPending} />
        <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Lista czytelnicza
          </h2>
          <BookList books={books} onRemove={handleRemove} />
        </div>
      </section>
    </main>
  );
}

export default BooksContainer;
