/* @vitest-environment jsdom */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookForm } from './BookForm';

describe('BookForm', () => {
  test('calls submit with trimmed values and clears inputs', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<BookForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('Tytuł książki'), '  Rework  ');
    await user.type(screen.getByLabelText('Autor książki'), ' Jason Fried  ');
    await user.click(screen.getByRole('button', { name: /dodaj książkę/i }));

    expect(handleSubmit).toHaveBeenCalledWith('Rework', 'Jason Fried');
    expect(screen.getByLabelText('Tytuł książki')).toHaveValue('');
    expect(screen.getByLabelText('Autor książki')).toHaveValue('');
  });

  test('disables submit when required fields are empty', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<BookForm onSubmit={handleSubmit} />);

    const submit = screen.getByRole('button', { name: /dodaj książkę/i });
    expect(submit).toBeDisabled();

    await user.type(screen.getByLabelText('Tytuł książki'), 'Only title');
    expect(submit).toBeDisabled();
    await user.clear(screen.getByLabelText('Tytuł książki'));

    await user.type(screen.getByLabelText('Autor książki'), 'Only author');
    expect(submit).toBeDisabled();

    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
