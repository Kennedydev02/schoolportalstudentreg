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
  const inputClasses = `w-full px-4 py-3.5 rounded-2xl
    bg-gray-50
    border border-gray-200
    text-gray-900 text-base
    placeholder-gray-500
    focus:border-primary-green focus:ring-4 focus:ring-primary-green/20
    focus:outline-none transition-all duration-300
    shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`;

  // Separate props for input and select with correct aria-invalid type
  const inputProps = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    onBlur,
    className: inputClasses,
    required,
    "aria-invalid": error ? true : false,
    "aria-describedby": error ? `${id}-error` : undefined,
    placeholder,
    type
  } as const;

  const selectProps = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value),
    onBlur,
    className: inputClasses,
    required,
    "aria-invalid": error ? true : false,
    "aria-describedby": error ? `${id}-error` : undefined,
    placeholder
  } as const;

  return (
    <div className={`space-y-2 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <label htmlFor={id} className="block text-[15px] font-medium text-primary-navy dark:text-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === 'select' ? (
        <div className="relative">
          <select {...selectProps}>
            <option value="">{placeholder}</option>
            {options.map(({ value: optionValue, label: optionLabel }) => (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            ))}
            {children}
          </select>
          <div className="absolute inset-0 w-full h-full rounded-xl pointer-events-none
            shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]" 
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="relative">
          <input {...inputProps} />
          <div className="absolute inset-0 w-full h-full rounded-xl pointer-events-none
            shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]" 
            aria-hidden="true"
          />
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField; 