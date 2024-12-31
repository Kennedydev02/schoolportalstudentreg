import React from 'react';
import { StepProps } from '@/types';
import FormField from '../ui/FormField';
import FormSection from '../ui/FormSection';

const PersonalInfo = ({ data, updateFields, errors, onBlur }: StepProps) => {
  return (
    <FormSection
      title="Personal Details"
      description="Please provide your basic information"
    >
      <FormField
        label="Full Name"
        id="fullName"
        value={data.fullName}
        onChange={(value) => updateFields({ fullName: value })}
        onBlur={() => onBlur?.('fullName', data.fullName)}
        placeholder="Enter your full name"
        required
        error={errors?.fullName}
      />

      <FormField
        label="Date of Birth"
        id="dateOfBirth"
        type="date"
        value={data.dateOfBirth}
        onChange={(value) => updateFields({ dateOfBirth: value })}
        onBlur={() => onBlur?.('dateOfBirth', data.dateOfBirth)}
        required
        error={errors?.dateOfBirth}
      />

      <FormField
        label="Gender"
        id="gender"
        type="select"
        value={data.gender}
        onChange={(value) => updateFields({ gender: value })}
        onBlur={() => onBlur?.('gender', data.gender)}
        placeholder="Select your gender"
        required
        error={errors?.gender}
        options={[
          { value: 'Male', label: 'Male' },
          { value: 'Female', label: 'Female' },
          { value: 'Other', label: 'Other' }
        ]}
      />

      <FormField
        label="ID/Passport Number"
        id="idNumber"
        value={data.idNumber}
        onChange={(value) => updateFields({ idNumber: value })}
        onBlur={() => onBlur?.('idNumber', data.idNumber)}
        placeholder="Enter your ID or passport number"
        required
        error={errors?.idNumber}
      />
    </FormSection>
  );
};

export default PersonalInfo; 