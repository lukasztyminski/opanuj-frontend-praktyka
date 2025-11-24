import { z } from 'zod';

// Allow any letter (including diacritics), spaces and hyphens.
const nameRegex = /^[\p{L} -]+$/u;

export const CharacterConsentFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'Imię musi mieć co najmniej 2 znaki')
    .refine((value) => nameRegex.test(value), {
      message: 'Imię nie może zawierać znaków specjalnych',
    }),
  lastName: z
    .string()
    .trim()
    .min(2, 'Nazwisko musi mieć co najmniej 2 znaki')
    .refine((value) => nameRegex.test(value), {
      message: 'Nazwisko nie może zawierać znaków specjalnych',
    }),
  email: z
    .string()
    .trim()
    .pipe(z.email({ message: 'Podaj poprawny adres email' })),
  consent: z.boolean().refine((value) => value === true, {
    message: 'Musisz wyrazić zgodę na przetwarzanie danych',
  }),
});

export type CharacterConsentFormFields = z.infer<typeof CharacterConsentFormSchema>;
export type CharacterConsentFormErrors = Partial<
  Record<keyof CharacterConsentFormFields, string[]>
>;

export const initialCharacterConsentForm: CharacterConsentFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  consent: false,
};

export function validateCharacterConsentForm(
  data: CharacterConsentFormFields
):
  | {
      success: true;
      data: CharacterConsentFormFields;
      errors: CharacterConsentFormErrors;
    }
  | { success: false; errors: CharacterConsentFormErrors } {
  const result = CharacterConsentFormSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data, errors: {} };
  }

  const fieldErrors: CharacterConsentFormErrors = {};

  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as keyof CharacterConsentFormFields | undefined;
    if (!field) return;
    fieldErrors[field] = [...(fieldErrors[field] ?? []), issue.message];
  });

  return { success: false, errors: fieldErrors };
}
