import { KeyboardEvent, useEffect, useState } from 'react';
import { Badge } from './Badge';

interface CategoryInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  error?: string;
}

export function CategoryInput({
  value = [],
  onChange,
  label,
  error,
}: CategoryInputProps) {
  const [inputValue, setInputValue] = useState('');
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();

      const newCategory = inputValue.trim();

      if (newCategory && !value.includes(newCategory)) {
        onChange([...value, newCategory]);
      }

      setInputValue('');
    }
    if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    onChange(value.filter((category) => category !== categoryToRemove));
  };

  return (
    <div className="flex w-full flex-col">
      {label && (
        <label className="mb-1 text-sm font-medium text-neutral-300">
          {label}
        </label>
      )}

      <div
        className={`flex min-h-10.5 flex-wrap items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 transition-colors focus-within:border-gold focus-within:ring-2 focus-within:ring-blue-500/20 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {value.map((category) => (
          <span
            key={category}
            className="flex items-center gap-1 rounded-full bg-neutral-600 px-2.5 py-0.5 text-sm font-medium text-neutral-200"
          >
            {category}
            <button
              type="button"
              onClick={() => removeCategory(category)}
              className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-neutral-200 hover:bg-neutral-200 hover:text-neutral-700 focus:outline-none"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            value.length === 0 ? 'Ex: Design, Development (Press Enter)' : ''
          }
          className="min-w-30 flex-1 bg-transparent text-sm text-neutral-200 focus:outline-none"
        />
      </div>

      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
  );
}
