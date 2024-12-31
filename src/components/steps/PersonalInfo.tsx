'use client';

import { StepProps } from '@/types';
import FormField from '../ui/FormField';

const PersonalInfo: React.FC<StepProps> = ({ data, updateFields }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-primary-navy dark:text-white">
          Personal Information
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Please provide your basic information
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          type="text"
          id="fullName"
          value={data.fullName}
          onChange={(value) => updateFields({ fullName: value })}
          placeholder="Enter your full name"
          required
          fullWidth
        />

        <FormField
          label="Date of Birth"
          type="date"
          id="dateOfBirth"
          value={data.dateOfBirth}
          onChange={(value) => updateFields({ dateOfBirth: value })}
          placeholder="mm/dd/yyyy"
          required
        />

        <FormField
          label="Gender"
          type="select"
          id="gender"
          value={data.gender}
          onChange={(value) => updateFields({ gender: value })}
          placeholder="Select your gender"
          required
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
            { value: 'prefer-not-to-say', label: 'Prefer not to say' }
          ]}
        />

        <FormField
          label="ID/Passport Number"
          type="text"
          id="idNumber"
          value={data.idNumber}
          onChange={(value) => updateFields({ idNumber: value })}
          placeholder="Enter your ID or passport number"
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfo; 