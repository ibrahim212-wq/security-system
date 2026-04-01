// ─────────────────────────────────────────────
// Toggle Switch Component
//
// A modern, accessible toggle switch for settings.
// Used for dark/light mode toggle and other boolean settings.
// ─────────────────────────────────────────────

"use client";

import { useState, useEffect } from "react";

interface ToggleSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
}

export default function ToggleSwitch({ 
  checked = false, 
  onChange, 
  disabled = false,
  label,
  description
}: ToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    if (disabled) return;
    
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isChecked ? 'bg-blue-600' : 'bg-gray-300'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      role="switch"
      aria-checked={isChecked}
      aria-label={label}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${isChecked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
      {label && (
        <span className="sr-only">{label}</span>
      )}
    </button>
  );
}
