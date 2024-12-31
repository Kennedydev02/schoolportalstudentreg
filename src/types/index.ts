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
  emergencyNotes?: string;
}

export interface StepProps {
  data: FormData;
  updateFields: (fields: Partial<FormData>) => void;
  errors?: Record<string, string>;
  onBlur?: (field: string, value: string) => void;
  showErrors?: boolean;
} 