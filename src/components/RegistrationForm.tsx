'use client';

import React, { useState, useEffect } from 'react';
import { FormData } from '@/types';
import PersonalInfo from './steps/PersonalInfo';
import ContactInfo from './steps/ContactInfo';
import EmergencyContact from './steps/EmergencyContact';
import ProgramEnrollment from './steps/ProgramEnrollment';
import Accommodation from './steps/Accommodation';
import AirportPickup from './steps/AirportPickup';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Logo from './Logo';
import { validateField, validateForm, ValidationError } from '@/utils/validation';
import { Toaster, toast } from 'react-hot-toast';
import Toast from './ui/Toast';

const STEPS = [
  { 
    title: "Personal Information", 
    component: PersonalInfo,
    fields: ['fullName', 'dateOfBirth', 'gender', 'idNumber']
  },
  { 
    title: "Contact Details", 
    component: ContactInfo,
    fields: ['phone', 'email', 'address']
  },
  { 
    title: "Emergency Contact", 
    component: EmergencyContact,
    fields: ['emergencyName', 'emergencyPhone', 'relationship', 'emergencyNotes']
  },
  { 
    title: "Program Selection", 
    component: ProgramEnrollment,
    fields: ['program', 'startDate']
  },
  { 
    title: "Accommodation", 
    component: Accommodation,
    fields: ['needsAccommodation', 'checkInDate']
  },
  { 
    title: "Airport Pickup", 
    component: AirportPickup,
    fields: ['needsAirportPickup', 'arrivalDate', 'arrivalTime']
  },
];

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
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fix hydration issue by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  const updateFields = (fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const handleFieldBlur = (field: string, value: string) => {
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error?.message || ''
    }));
  };

  const validateStep = (stepIndex: number): boolean => {
    const stepFields = STEPS[stepIndex].fields;
    const stepData = Object.fromEntries(
      Object.entries(formData).filter(([key]) => stepFields.includes(key))
    );

    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validate each field in the current step
    stepFields.forEach(field => {
      if (!stepData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      } else {
        // Add specific validation rules
        switch (field) {
          case 'fullName':
            if (!/^[a-zA-Z\s]*$/.test(stepData[field])) {
              newErrors[field] = 'Name should only contain letters and spaces';
              isValid = false;
            }
            break;
          case 'email':
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepData[field])) {
              newErrors[field] = 'Please enter a valid email address';
              isValid = false;
            }
            break;
          case 'phone':
            if (!/^\+?[\d\s-]{10,}$/.test(stepData[field])) {
              newErrors[field] = 'Please enter a valid phone number';
              isValid = false;
            }
            break;
          // Add more field-specific validations as needed
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const showErrorToast = (errors: string[]) => {
    toast.custom((t) => (
      <Toast
        title="Please fix the following errors:"
        errors={errors}
        onClose={() => toast.dismiss(t.id)}
      />
    ), {
      duration: 5000,
      position: 'top-center',
      className: 'toast-message'
    });
  };

  const showSuccessToast = () => {
    toast.custom((t) => (
      <Toast
        title="Form submitted successfully!"
        type="success"
        onClose={() => toast.dismiss(t.id)}
      />
    ), {
      duration: 3000,
      position: 'top-center',
      className: 'toast-message'
    });
  };

  const handleNext = () => {
    setShowErrors(true);
    
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
      setShowErrors(false);
    } else {
      const errorMessages = Object.values(errors);
      if (errorMessages.length > 0) {
        showErrorToast(errorMessages);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    setIsSubmitting(true);
    
    let isValid = true;
    const allErrors: Record<string, string> = {};

    STEPS.forEach((step, index) => {
      if (!validateStep(index)) {
        isValid = false;
        Object.assign(allErrors, errors);
      }
    });

    if (!isValid) {
      setErrors(allErrors);
      showErrorToast(Object.values(allErrors));
      setIsSubmitting(false);
      return;
    }

    try {
      // Process form submission
      console.log('Form submitted:', formData);
      showSuccessToast();
    } catch (error) {
      console.error('Submission error:', error);
      showErrorToast(['An error occurred while submitting the form. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(c => c - 1);
    setErrors({}); // Clear errors when going back
  };

  return (
    <div className="min-h-screen transition-colors duration-300 relative overflow-hidden
      bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-[#1B2B5E]/95 dark:via-[#1B2B5E] dark:to-[#1B2B5E]/90">
      <Toaster
        containerStyle={{
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)'
        }}
        toastOptions={{
          className: 'toast-container',
          duration: 5000,
          style: {
            background: 'transparent',
            padding: 0,
            margin: 0,
            boxShadow: 'none',
            maxWidth: '500px',
            width: '100%'
          },
        }}
      />
      {/* Background with Logo - Adjusted opacity */}
      <div className="absolute inset-0 w-full h-full opacity-[0.02]">
        <Image
          src="/images/logo-bg.png"
          alt=""
          fill
          priority
          className="object-cover scale-125"
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="py-4 md:py-6 relative">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <Logo />
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 pb-8">
          <h1 className="text-3xl font-semibold text-center mb-4">
            Student Registration
          </h1>

          {/* Enhanced Form Card with Better Shadows */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl overflow-hidden backdrop-blur-sm
              ${theme === 'dark' 
                ? 'bg-white/10 border border-white/20 shadow-2xl shadow-black/10' 
                : 'bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100'
              }`}
          >
            {/* Progress Steps with Enhanced Styling */}
            <div className="bg-[#1B2B5E] p-6">
              <div className="space-y-4">
                {/* Improved Progress Bar */}
                <div className="flex justify-between gap-2">
                  {STEPS.map((_, index) => (
                    <motion.div 
                      key={index} 
                      className="flex-1"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`h-2.5 rounded-full transition-all duration-500 
                        ${index <= currentStep 
                          ? 'bg-gradient-to-r from-[#76B95E] via-[#68A553] to-[#76B95E] shadow-lg shadow-[#76B95E]/20' 
                          : 'bg-white/20'
                        }`} 
                      />
                    </motion.div>
                  ))}
                </div>
                {/* Enhanced Step Titles */}
                <div className="flex justify-between text-white/90 text-sm font-medium">
                  {STEPS.map((step, index) => (
                    <div 
                      key={index}
                      className={`transition-colors ${
                        index === currentStep 
                          ? 'text-white scale-105 transform duration-300' 
                          : ''
                      }`}
                    >
                      Step {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section Title with Enhanced Typography */}
            <div className="bg-[#1B2B5E] py-5 px-8 border-t border-white/10">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                {STEPS[currentStep].title}
              </h2>
            </div>

            {/* Form Content with Better Spacing */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="min-h-[400px]"
                  >
                    {React.createElement(STEPS[currentStep].component, {
                      data: formData,
                      updateFields,
                      errors,
                      onBlur: handleFieldBlur,
                      showErrors,
                    })}
                  </motion.div>
                </AnimatePresence>

                {/* Enhanced Navigation */}
                <div className="flex justify-end items-center mt-8 pt-6 
                  border-t border-gray-200 dark:border-white/10">
                  <div className="mr-auto text-sm font-medium opacity-70">
                    Step {currentStep + 1} of {STEPS.length}
                  </div>
                  <div className="flex gap-4">
                    {currentStep > 0 && (
                      <motion.button
                        type="button"
                        onClick={handlePrevious}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-2.5 border-2 border-[#1B2B5E] dark:border-white/20
                          text-[#1B2B5E] dark:text-white rounded-xl 
                          hover:bg-[#1B2B5E]/5 dark:hover:bg-white/5 
                          transition-all duration-300 flex items-center gap-2
                          shadow-sm hover:shadow-md"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                      </motion.button>
                    )}
                    <motion.button
                      type={currentStep === STEPS.length - 1 ? 'submit' : 'button'}
                      onClick={currentStep === STEPS.length - 1 ? undefined : handleNext}
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={`px-8 py-2.5 bg-gradient-to-r from-[#76B95E] via-[#68A553] to-[#76B95E]
                        text-white rounded-xl shadow-lg shadow-[#76B95E]/20
                        hover:shadow-xl hover:shadow-[#76B95E]/30 transition-all duration-300
                        flex items-center gap-2 font-medium
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-pulse">Processing...</span>
                          {/* Add a loading spinner here if desired */}
                        </>
                      ) : currentStep === STEPS.length - 1 ? (
                        <>Submit <Check className="w-4 h-4" /></>
                      ) : (
                        <>Continue <ArrowRight className="w-4 h-4" /></>
                      )}
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm; 