import { useCallback, useMemo, useState } from 'react';
import { Switch } from './Switch';
import {
  initialCharacterConsentForm,
  type CharacterConsentFormFields,
  type CharacterConsentFormErrors,
  validateCharacterConsentForm,
} from '../models/CharacterConsentForm';

interface CharacterConsentFormProps {
  onSubmitSuccess?: (data: CharacterConsentFormFields) => void;
}

export function CharacterConsentForm({
  onSubmitSuccess,
}: CharacterConsentFormProps) {
  const [formData, setFormData] = useState<CharacterConsentFormFields>(
    initialCharacterConsentForm
  );
  const [errors, setErrors] = useState<CharacterConsentFormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const result = validateCharacterConsentForm(formData);
      if (!result.success) {
        setErrors(result.errors);
        setSuccessMessage(null);
        return;
      }

      setErrors({});
      setSuccessMessage('Dziękujemy! Formularz został poprawnie wysłany.');
      setFormData(result.data);
      onSubmitSuccess?.(result.data);
    },
    [formData, onSubmitSuccess]
  );

  const errorLists = useMemo(() => {
    const makeList = (field: keyof CharacterConsentFormFields) =>
      errors[field]?.map((message) => (
        <li key={message} className="text-xs text-rose-300">
          {message}
        </li>
      ));

    return {
      firstName: makeList('firstName'),
      lastName: makeList('lastName'),
      email: makeList('email'),
      consent: makeList('consent'),
    };
  }, [errors]);

  return (
    <form
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-emerald-200">
          Formularz zainteresowania bohaterami
        </p>
        <p className="text-xs text-slate-300">
          Uzupełnij dane kontaktowe i wyraź zgodę, aby otrzymać listę
          ciekawostek o postaciach.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-200">
          Imię
          <input
            aria-invalid={Boolean(errors.firstName?.length)}
            aria-describedby="firstName-error"
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            name="firstName"
            onChange={handleInputChange}
            placeholder="np. Rick"
            value={formData.firstName}
            autoComplete="given-name"
          />
        </label>
        <ul id="firstName-error">{errorLists.firstName}</ul>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-200">
          Nazwisko
          <input
            aria-invalid={Boolean(errors.lastName?.length)}
            aria-describedby="lastName-error"
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            name="lastName"
            onChange={handleInputChange}
            placeholder="np. Sanchez"
            value={formData.lastName}
            autoComplete="family-name"
          />
        </label>
        <ul id="lastName-error">{errorLists.lastName}</ul>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-200">
          Email
          <input
            aria-invalid={Boolean(errors.email?.length)}
            aria-describedby="email-error"
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            name="email"
            onChange={handleInputChange}
            placeholder="np. rick@multiverse.com"
            type="email"
            value={formData.email}
            autoComplete="email"
          />
        </label>
        <ul id="email-error">{errorLists.email}</ul>

        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
          <Switch
            name="consent"
            label="Wyrażam zgodę na przetwarzanie danych osobowych"
            checked={formData.consent}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, consent: value }))
            }
          />
        </div>
        <ul id="consent-error">{errorLists.consent}</ul>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          Wyślij formularz
        </button>

        {successMessage && (
          <p className="text-sm text-emerald-200" role="status">
            {successMessage}
          </p>
        )}
      </div>
    </form>
  );
}

export default CharacterConsentForm;
