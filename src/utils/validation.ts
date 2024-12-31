import { isValid, parse, differenceInYears } from 'date-fns';

export const VALIDATION_RULES = {
  fullName: {
    pattern: /^[a-zA-Z\s]*$/,
    maxLength: 50,
    message: "Full Name must only include letters and spaces, and be under 50 characters."
  },
  phone: {
    pattern: /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
    message: "Enter a valid phone number in the format (XXX) XXX-XXXX or XXX-XXX-XXXX."
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address in the format user@example.com."
  },
  idNumber: {
    pattern: /^[A-Za-z0-9]{6,15}$/,
    message: "Enter a valid ID/Passport Number. It should be alphanumeric and 6–15 characters long."
  },
  address: {
    minLength: 10,
    message: "Enter a valid address with at least 10 characters."
  }
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validateField = (field: string, value: string): ValidationError | null => {
  switch (field) {
    case 'fullName':
      if (!value) return { field, message: 'Full Name is required' };
      if (!VALIDATION_RULES.fullName.pattern.test(value)) {
        return { field, message: VALIDATION_RULES.fullName.message };
      }
      if (value.length > VALIDATION_RULES.fullName.maxLength) {
        return { field, message: VALIDATION_RULES.fullName.message };
      }
      break;

    case 'dateOfBirth':
      if (!value) return { field, message: 'Date of Birth is required' };
      const date = parse(value, 'yyyy-MM-dd', new Date());
      if (!isValid(date)) {
        return { field, message: 'Please enter a valid date' };
      }
      const age = differenceInYears(new Date(), date);
      if (age < 18) {
        return { field, message: 'You must be at least 18 years old' };
      }
      break;

    case 'gender':
      if (!value) return { field, message: 'Please select a valid gender option' };
      break;

    case 'idNumber':
      if (!value) return { field, message: 'ID/Passport Number is required' };
      if (!VALIDATION_RULES.idNumber.pattern.test(value)) {
        return { field, message: VALIDATION_RULES.idNumber.message };
      }
      break;

    case 'phone':
      if (!value) return { field, message: 'Phone Number is required' };
      if (!VALIDATION_RULES.phone.pattern.test(value)) {
        return { field, message: VALIDATION_RULES.phone.message };
      }
      break;

    case 'email':
      if (!value) return { field, message: 'Email Address is required' };
      if (!VALIDATION_RULES.email.pattern.test(value)) {
        return { field, message: VALIDATION_RULES.email.message };
      }
      break;

    case 'address':
      if (!value) return { field, message: 'Address is required' };
      if (value.length < VALIDATION_RULES.address.minLength) {
        return { field, message: VALIDATION_RULES.address.message };
      }
      break;
  }

  return null;
};

export const validateForm = (data: Record<string, string>): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  Object.entries(data).forEach(([field, value]) => {
    const error = validateField(field, value);
    if (error) errors.push(error);
  });

  return errors;
}; 