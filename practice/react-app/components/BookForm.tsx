import { FormEvent, useState } from 'react';

interface BookFormProps {
  onSubmit: (title: string, author: string) => void;
  isSubmitting?: boolean;
}

export function BookForm({ onSubmit, isSubmitting }: BookFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !author.trim()) {
      return;
    }

    onSubmit(title.trim(), author.trim());
    setTitle('');
    setAuthor('');
  };

  const isDisabled = !title.trim() || !author.trim() || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm"
    >
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Tytuł
        <input
          aria-label="Tytuł książki"
          className="rounded border border-slate-300 px-3 py-2 text-sm text-white"
          name="title"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="np. Pragmatyczny Programista"
          value={title}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Autor
        <input
          aria-label="Autor książki"
          className="rounded border border-slate-300 px-3 py-2 text-sm text-white"
          name="author"
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="np. Andrew Hunt"
          value={author}
        />
      </label>

      <button
        aria-label="Dodaj książkę"
        className="rounded bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={isDisabled}
        type="submit"
      >
        Dodaj do listy
      </button>
    </form>
  );
}
