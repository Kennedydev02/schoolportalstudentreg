import React from 'react';
import { format, addDays } from 'date-fns';
import FormSection from '../ui/FormSection';
import FormField from '../ui/FormField';
import DatePicker from '../ui/DatePicker';
import { StepProps } from '@/types';

const ProgramEnrollment = ({ data, updateFields }: StepProps) => {
  return (
    <FormSection
      title="Program Selection"
      description="Choose your preferred program and start date"
    >
      <FormField
        label="Program"
        id="program"
        type="select"
        value={data.program}
        onChange={(value) => updateFields({ program: value })}
        placeholder="Select your program"
        required
        options={[
          { value: 'caregiver', label: 'Caregiver Training' },
          { value: 'nursing', label: 'Nursing Assistant' },
          { value: 'medical', label: 'Medical Assistant' },
          { value: 'phlebotomy', label: 'Phlebotomy' }
        ]}
        description="Select the program you wish to enroll in"
      />

      <DatePicker
        label="Start Date"
        id="startDate"
        value={data.startDate}
        onChange={(value) => updateFields({ startDate: value })}
        placeholder="Choose your start date"
        required
        description="When would you like to start?"
        minDate={format(addDays(new Date(), 14), 'yyyy-MM-dd')}
      />
    </FormSection>
  );
};

export default ProgramEnrollment; 