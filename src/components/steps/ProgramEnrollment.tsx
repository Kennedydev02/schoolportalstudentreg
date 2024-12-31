'use client';

import { StepProps } from '@/types';
import FormField from '../ui/FormField';
import DatePicker from '../ui/DatePicker';

const ProgramEnrollment: React.FC<StepProps> = ({ data, updateFields }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary-navy dark:text-white">
        Program Enrollment
      </h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <FormField
            label="Program"
            type="select"
            id="program"
            value={data.program}
            onChange={(value) => updateFields({ program: value })}
            placeholder="Select a program"
            required
            options={[
              { value: 'caregiver', label: 'Caregiver Training' },
              { value: 'nursing', label: 'Nursing Assistant' },
              { value: 'medical', label: 'Medical Assistant' },
              { value: 'phlebotomy', label: 'Phlebotomy' }
            ]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select the program you wish to enroll in
          </p>
        </div>

        <DatePicker
          label="Start Date"
          id="startDate"
          value={data.startDate}
          onChange={(value) => updateFields({ startDate: value })}
          placeholder="Select your preferred start date"
          required
          minDate={new Date().toISOString().split('T')[0]}
        />
      </div>
    </div>
  );
};

export default ProgramEnrollment; 