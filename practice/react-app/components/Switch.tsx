import { useId } from 'react';

interface SwitchProps {
  name?: string;
  label?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export function Switch({
  checked,
  onChange,
  disabled,
  name,
  label,
  id,
}: SwitchProps) {
  const autoId = useId();
  const switchId = id ?? `switch-${autoId}`;
  const labelId = label ? `${switchId}-label` : undefined;

  const toggle = () => {
    if (disabled) return;
    onChange(!checked);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <div className="flex items-center gap-3">
      {label && (
        <span id={labelId} className="text-sm font-medium text-slate-200">
          {label}
        </span>
      )}
      <button
        type="button"
        id={switchId}
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-disabled={disabled}
        className={`relative inline-flex h-7 w-12 items-center rounded-full border border-slate-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
          checked
            ? 'bg-emerald-500/80'
            : 'bg-slate-700 hover:bg-slate-600 active:bg-slate-500'
        } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        <span
          aria-hidden
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
      {name && <input type="hidden" name={name} value={String(checked)} />}
    </div>
  );
}

export default Switch;
