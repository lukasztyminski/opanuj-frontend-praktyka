/* @vitest-environment jsdom */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Switch } from './Switch';

const SwitchHarness = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Switch
        label="Zgoda"
        name="consent"
        checked={checked}
        onChange={setChecked}
      />
      <div data-testid="status">{checked ? 'on' : 'off'}</div>
    </div>
  );
};

describe('Switch', () => {
  test('toggles with keyboard Space and Enter', async () => {
    const user = userEvent.setup();
    render(<SwitchHarness />);

    const control = screen.getByRole('switch', { name: /zgoda/i });
    control.focus();

    expect(control).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByTestId('status')).toHaveTextContent('off');

    await user.keyboard('[Space]');
    expect(control).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByTestId('status')).toHaveTextContent('on');

    await user.keyboard('[Enter]');
    expect(control).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByTestId('status')).toHaveTextContent('off');
  });
});
