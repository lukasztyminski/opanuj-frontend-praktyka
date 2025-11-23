import type { Character } from '../api/api-client-generated';

interface CharacterCardProps {
  character: Character;
}

const statusStyles: Record<string, string> = {
  alive:
    'bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/40 dark:text-emerald-200',
  dead: 'bg-rose-500/15 text-rose-200 ring-1 ring-rose-500/40',
  unknown: 'bg-slate-500/15 text-slate-200 ring-1 ring-slate-500/40',
};

export function CharacterCard({ character }: CharacterCardProps) {
  const status = (character.status ?? 'unknown').toLowerCase();
  const badgeClass = statusStyles[status] ?? statusStyles.unknown;

  return (
    <li className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg ring-1 ring-slate-800 transition duration-200 hover:-translate-y-1 hover:border-emerald-400/60 hover:ring-emerald-400/30">
      <div className="flex gap-4">
        <img
          alt={`Zdjęcie ${character.name ?? 'bohatera'}`}
          className="h-20 w-20 rounded-xl object-cover ring-2 ring-slate-800 group-hover:ring-emerald-400/70"
          loading="lazy"
          src={character.image}
        />
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-start gap-2">
            <p className="text-lg font-semibold text-white">
              {character.name ?? 'Nieznana postać'}
            </p>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeClass}`}>
              {character.status ?? 'unknown'}
            </span>
          </div>
          <p className="text-sm text-slate-200">
            {character.species ?? 'Gatunek nieznany'}
            {character.gender ? ` • ${character.gender}` : ''}
          </p>
          <p className="text-xs text-slate-400">
            Pochodzenie: {character.origin?.name ?? 'nieznane'}
          </p>
          <p className="text-xs text-slate-500">
            Ostatnia lokalizacja: {character.location?.name ?? 'brak danych'}
          </p>
        </div>
      </div>
    </li>
  );
}
