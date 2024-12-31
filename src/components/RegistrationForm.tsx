'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Check, Sun, Moon } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { format } from 'date-fns';

// Import your step components
import PersonalInfo from './steps/PersonalInfo';
import ContactInfo from './steps/ContactInfo';
import EmergencyContact from './steps/EmergencyContact';
import ProgramEnrollment from './steps/ProgramEnrollment';
import Accommodation from './steps/Accommodation';
import AirportPickup from './steps/AirportPickup';

// Define FormData interface
export interface FormData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  idNumber: string;
  phone: string;
  email: string;
  address: string;
  emergencyName: string;
  emergencyPhone: string;
  relationship: string;
  program: string;
  startDate: string;
  needsAccommodation: boolean;
  checkInDate: string;
  needsAirportPickup: boolean;
  arrivalDate: string;
  arrivalTime: string;
}

export interface StepProps {
  data: FormData;
  updateFields: (fields: Partial<FormData>) => void;
}

const INITIAL_DATA: FormData = {
  fullName: '',
  dateOfBirth: '',
  gender: '',
  idNumber: '',
  phone: '',
  email: '',
  address: '',
  emergencyName: '',
  emergencyPhone: '',
  relationship: '',
  program: '',
  startDate: '',
  needsAccommodation: false,
  checkInDate: '',
  needsAirportPickup: false,
  arrivalDate: '',
  arrivalTime: '',
};

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const updateFields = (fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const steps = [
    <PersonalInfo key="personal" data={formData} updateFields={updateFields} />,
    <ContactInfo key="contact" data={formData} updateFields={updateFields} />,
    <EmergencyContact key="emergency" data={formData} updateFields={updateFields} />,
    <ProgramEnrollment key="program" data={formData} updateFields={updateFields} />,
    <Accommodation key="accommodation" data={formData} updateFields={updateFields} />,
    <AirportPickup key="airport" data={formData} updateFields={updateFields} />,
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(c => c + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(c => c - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add your form submission logic here
      toast.success('Registration submitted successfully!');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen transition-colors duration-300 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-[#1B2B5E]/95 dark:via-[#1B2B5E] dark:to-[#1B2B5E]/90">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: theme === 'dark' ? '#333' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333',
          },
        }}
      />
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Student Registration
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-700 p-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-1 flex-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                      index <= currentStep ? 'bg-primary-green' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-700" />
                  )}
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep]}
            </motion.div>

            <div className="mt-6 flex justify-between">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-4 py-2 bg-primary-green text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-4 py-2 bg-primary-green text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm; 