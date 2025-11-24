import { CharacterConsentForm } from '../components/CharacterConsentForm';
import { CharacterListSection } from '../components/CharacterListSection';

function CharactersContainer() {
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
            Dane pochodzą bezpośrednio z publicznego API dzięki wygenerowanemu klientowi
            OpenAPI. Użyj tego widoku, aby szybko przejrzeć ulubione postacie wraz z ich
            statusem i pochodzeniem.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr,1.2fr]">
          <CharacterConsentForm />
          <CharacterListSection />
        </section>
      </div>
    </main>
  );
}

export default CharactersContainer;
