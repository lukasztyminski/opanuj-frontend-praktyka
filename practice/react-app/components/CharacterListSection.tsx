import { CharacterCard } from './CharacterCard';
import { useCharacters } from '../hooks/useCharacters';

export function CharacterListSection() {
  const { data, isLoading, isError, error } = useCharacters();
  const characters = data?.characters ?? [];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur">
      {isLoading && <p className="text-sm text-slate-300">Ładuję postacie...</p>}

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
            <CharacterCard character={character} key={character.id ?? character.name} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CharacterListSection;
