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
  emergencyNotes?: string;
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