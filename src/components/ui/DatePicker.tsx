import React from 'react';
import { format } from 'date-fns';

interface DatePickerProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  description?: string;
  minDate?: string;
  fullWidth?: boolean;
}

const DatePicker = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  required,
  description,
  minDate,
  fullWidth
}: DatePickerProps) => {
  const baseInputStyles = `w-full px-4 py-3.5 rounded-xl
    bg-gray-50 dark:bg-white/5
    border-2 border-gray-200 dark:border-white/10
    text-gray-900 dark:text-white text-base
    placeholder-gray-500 dark:placeholder-gray-400
    focus:border-[#76B95E] focus:ring-4 focus:ring-[#76B95E]/20
    dark:focus:border-[#76B95E] dark:focus:ring-[#76B95E]/20
    focus:outline-none transition-all duration-300
    shadow-sm hover:shadow-md`;

  return (
    <div className={`space-y-3 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <div>
        <label 
          htmlFor={id} 
          className="block text-[15px] font-medium text-[#1B2B5E] dark:text-white"
        >
          {label}
        </label>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      <div className="relative">
        <input
          type="date"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={minDate || format(new Date(), 'yyyy-MM-dd')}
          className={`${baseInputStyles} mobile-date-input`}
          required={required}
          placeholder={placeholder}
        />
        <div className="absolute inset-0 w-full h-full rounded-xl pointer-events-none
          shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]" 
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default DatePicker; 