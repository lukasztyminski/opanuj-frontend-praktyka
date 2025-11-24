/* @vitest-environment jsdom */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CharacterConsentForm } from './CharacterConsentForm';

describe('CharacterConsentForm', () => {
  test('shows validation errors and sets aria-invalid on required fields', async () => {
    const user = userEvent.setup();
    render(<CharacterConsentForm />);

    await user.click(screen.getByRole('button', { name: /wyślij formularz/i }));

    expect(
      screen.getByText(/imię musi mieć co najmniej 2 znaki/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/nazwisko musi mieć co najmniej 2 znaki/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/podaj poprawny adres email/i)).toBeInTheDocument();
    expect(
      screen.getByText(/musisz wyrazić zgodę na przetwarzanie danych/i)
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/imię/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/nazwisko/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
  });

  test('submits successfully with valid data and notifies parent', async () => {
    const user = userEvent.setup();
    const handleSuccess = vi.fn();
    render(<CharacterConsentForm onSubmitSuccess={handleSuccess} />);

    await user.type(screen.getByLabelText(/imię/i), 'Rick');
    await user.type(screen.getByLabelText(/nazwisko/i), 'Sanchez');
    await user.type(screen.getByLabelText(/email/i), 'rick@example.com');

    const consentSwitch = screen.getByRole('switch', {
      name: /wyrażam zgodę/i,
    });
    await user.click(consentSwitch);

    await user.click(screen.getByRole('button', { name: /wyślij formularz/i }));

    expect(screen.getByRole('status')).toHaveTextContent(
      /dziękujemy! formularz został poprawnie wysłany\./i
    );
    expect(handleSuccess).toHaveBeenCalledWith({
      firstName: 'Rick',
      lastName: 'Sanchez',
      email: 'rick@example.com',
      consent: true,
    });
  });
});
