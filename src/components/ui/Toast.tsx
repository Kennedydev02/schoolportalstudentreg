import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ToastProps {
  title: string;
  errors?: string[];
  onClose: () => void;
  type?: 'error' | 'success';
}

const Toast = ({ title, errors, onClose, type = 'error' }: ToastProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`rounded-xl shadow-2xl p-6 max-w-md w-[95vw] mx-auto
        backdrop-blur-lg
        ${type === 'error' 
          ? 'bg-red-50/95 dark:bg-red-900/90 border-2 border-red-200 dark:border-red-800' 
          : 'bg-green-50/95 dark:bg-green-900/90 border-2 border-green-200 dark:border-green-800'
        }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className={`text-base font-semibold mb-2 ${
            type === 'error' ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'
          }`}>
            {title}
          </h3>
          {errors && errors.length > 0 && (
            <ul className="mt-2 text-sm space-y-2">
              {errors.map((error, index) => (
                <li key={index} className={`flex items-center ${
                  type === 'error' ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'
                }`}>
                  <span className="mr-2 text-lg">•</span>
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={onClose}
          className={`shrink-0 rounded-lg p-2 transition-colors
            ${type === 'error' 
              ? 'text-red-500 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-800/50' 
              : 'text-green-500 hover:bg-green-100 dark:text-green-300 dark:hover:bg-green-800/50'
            }
            focus:outline-none focus:ring-2 focus:ring-offset-2 
            ${type === 'error' ? 'focus:ring-red-500' : 'focus:ring-green-500'}`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default Toast; 