import { CharacterCard } from '../components/CharacterCard';
import { useCharacters } from '../hooks/useCharacters';

function CharactersContainer() {
  const { data, isLoading, isError, error } = useCharacters();
  const characters = data?.characters ?? [];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="rounded-3xl border border-slate-800 bg-gradient-to-r from-emerald-600/40 via-slate-900 to-slate-900 p-8 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200/80">
            OpenAPI + React Query
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Bohaterowie Rick and Morty
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            Dane pochodzą bezpośrednio z publicznego API dzięki wygenerowanemu
            klientowi OpenAPI. Użyj tego widoku, aby szybko przejrzeć ulubione
            postacie wraz z ich statusem i pochodzeniem.
          </p>
        </header>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur">
          {isLoading && (
            <p className="text-sm text-slate-300">Ładuję postacie...</p>
          )}

          {isError && (
            <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              Nie udało się pobrać danych.{' '}
              <span className="text-rose-200/80">
                {error instanceof Error ? error.message : 'Spróbuj ponownie.'}
              </span>
            </div>
          )}

          {!isLoading && !isError && (
            <ul
              aria-label="Lista bohaterów"
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {characters.map((character) => (
                <CharacterCard
                  character={character}
                  key={character.id ?? character.name}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default CharactersContainer;
