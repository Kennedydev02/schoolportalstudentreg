'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Check, Sun, Moon } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import Image from 'next/image';
import { validateStep } from '@/lib/validation';

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const updateFields = (fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
    // Clear errors for updated fields
    const updatedErrors = { ...errors };
    Object.keys(fields).forEach(key => delete updatedErrors[key]);
    setErrors(updatedErrors);
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
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setCurrentStep(c => c + 1);
    setErrors({});
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-primary-navy py-6">
          Student Registration
        </h1>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress bar */}
          <div className="bg-primary-navy rounded-t-2xl">
            <div className="p-6">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                      index <= currentStep ? 'bg-primary-green' : 'bg-gray-400/30'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`text-base ${
                      index <= currentStep ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    Step {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form content */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {steps[currentStep]}
              </motion.div>

              {/* Error Messages */}
              {Object.keys(errors).length > 0 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 font-medium mb-2">Please fix the following errors:</p>
                  <ul className="list-disc list-inside text-red-500">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Step {currentStep + 1} of {steps.length}
                </div>
                <div className="flex space-x-4">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="px-6 py-2.5 border-2 border-primary-navy text-primary-navy rounded-full hover:bg-primary-navy hover:text-white transition-colors duration-300"
                    >
                      Previous
                    </button>
                  )}
                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 bg-primary-green text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-primary-green text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm; 