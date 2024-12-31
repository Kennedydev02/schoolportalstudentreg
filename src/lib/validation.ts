import { FormData } from '@/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

export const validateStep = (step: number, data: FormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  switch (step) {
    case 0: // Personal Info
      if (!data.fullName?.trim()) errors.fullName = 'Full name is required';
      if (!data.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
      if (!data.gender) errors.gender = 'Gender is required';
      if (!data.idNumber?.trim()) errors.idNumber = 'ID/Passport number is required';
      break;

    case 1: // Contact Info
      if (!data.phone?.trim() || !PHONE_REGEX.test(data.phone)) errors.phone = 'Valid phone number is required';
      if (!data.email?.trim() || !EMAIL_REGEX.test(data.email)) errors.email = 'Valid email is required';
      if (!data.address?.trim()) errors.address = 'Address is required';
      break;

    case 2: // Emergency Contact
      if (!data.emergencyName?.trim()) errors.emergencyName = 'Emergency contact name is required';
      if (!data.emergencyPhone?.trim() || !PHONE_REGEX.test(data.emergencyPhone)) errors.emergencyPhone = 'Valid phone number is required';
      if (!data.relationship?.trim()) errors.relationship = 'Relationship is required';
      break;
  }

  return errors;
}; 