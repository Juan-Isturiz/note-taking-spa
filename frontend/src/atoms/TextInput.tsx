import { Field, Input, Label } from '@headlessui/react';
import { forwardRef } from 'react';
export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <Field className={className}>
        {label && <Label className={'text-neutral-300'}>{label}</Label>}
        <Input
          className=" px-1.5 border rounded-md border-gray-300 bg-neutral-600 text-neutral-200"
          ref={ref}
          data-invalid={error ? '' : undefined}
          {...props}
        />
        {error && <span>{error}</span>}
      </Field>
    );
  }
);

TextInput.displayName = 'TextInput';
