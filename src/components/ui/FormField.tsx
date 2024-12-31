'use client';

import React from 'react';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'time' | 'select';
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  onBlur,
  error,
  required,
  placeholder,
  options = [],
  fullWidth,
  children
}) => {
  const inputClasses = `mt-1 block ${fullWidth ? 'w-full' : ''} rounded-md border-gray-300 shadow-sm 
    focus:border-primary-green focus:ring-primary-green
    ${error ? 'border-red-500' : 'border-gray-300'}`;

  const ariaInvalid: boolean | "true" | "false" = error ? true : false;

  const commonProps = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(e.target.value),
    onBlur,
    className: inputClasses,
    required,
    "aria-invalid": ariaInvalid,
    "aria-describedby": error ? `${id}-error` : undefined,
    placeholder
  };

  const selectProps = {
    ...commonProps,
    "aria-invalid": ariaInvalid
  };

  const inputProps = {
    ...commonProps,
    type
  };

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === 'select' ? (
        <select {...selectProps}>
          <option value="">{placeholder}</option>
          {options.map(({ value: optionValue, label: optionLabel }) => (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          ))}
          {children}
        </select>
      ) : (
        <input {...inputProps} />
      )}

      {error && (
        <p className="text-red-500 text-sm mt-1" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField; 