import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string; }[];
  description?: string;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  error?: string;
  onBlur?: () => void;
  showErrors?: boolean;
}

const FormField = ({ 
  label, 
  id, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  required,
  options,
  description,
  multiline = false,
  rows = 3,
  fullWidth = false,
  error,
  onBlur,
  showErrors = false,
}: FormFieldProps) => {
  const [touched, setTouched] = useState(false);
  const showError = (touched || showErrors) && error;

  const handleBlur = () => {
    setTouched(true);
    onBlur?.();
  };

  const baseInputStyles = `w-full px-4 py-3.5 rounded-xl
    bg-gray-50 dark:bg-white/5
    border-2 transition-all duration-300
    ${showError 
      ? 'border-red-500 dark:border-red-500 bg-red-50/50 dark:bg-red-900/10' 
      : 'border-gray-200 dark:border-white/10'
    }
    text-gray-900 dark:text-white text-base
    placeholder-gray-500 dark:placeholder-gray-400
    ${showError 
      ? 'focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
      : 'focus:border-[#76B95E] focus:ring-4 focus:ring-[#76B95E]/20'
    }
    dark:focus:border-[#76B95E] dark:focus:ring-[#76B95E]/20
    focus:outline-none
    shadow-sm hover:shadow-md`;

  return (
    <div className={`space-y-3 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <div className="flex justify-between items-baseline">
        <label 
          htmlFor={id} 
          className={`block text-[15px] font-medium ${
            showError 
              ? 'text-red-600 dark:text-red-400' 
              : 'text-[#1B2B5E] dark:text-white'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}

      <div className="relative">
        {type === 'select' ? (
          <>
            <select
              id={id}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={handleBlur}
              className={baseInputStyles}
              required={required}
              aria-invalid={showError}
              aria-describedby={showError ? `${id}-error` : undefined}
            >
              <option value="">{placeholder}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </>
        ) : multiline ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
            rows={rows}
            className={`${baseInputStyles} resize-none`}
            placeholder={placeholder}
            required={required}
            aria-invalid={showError}
            aria-describedby={showError ? `${id}-error` : undefined}
          />
        ) : (
          <input
            type={type}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
            className={baseInputStyles}
            placeholder={placeholder}
            required={required}
            aria-invalid={showError}
            aria-describedby={showError ? `${id}-error` : undefined}
          />
        )}

        {/* Error Icon */}
        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 dark:text-red-400"
            >
              <AlertCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {showError && (
            <motion.p
              id={`${id}-error`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div 
          className={`absolute inset-0 w-full h-full rounded-xl pointer-events-none
            shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]
            ${showError ? 'shadow-red-500/10' : ''}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default FormField; 