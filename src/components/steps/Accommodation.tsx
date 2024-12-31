import React from 'react';
import { StepProps } from '../../types';
import FormSection from '../ui/FormSection';
import FormField from '../ui/FormField';
import DatePicker from '../ui/DatePicker';
import { format, addDays } from 'date-fns';

const Accommodation = ({ data, updateFields }: StepProps) => {
  return (
    <FormSection
      title="Accommodation"
      description="Let us know if you need housing assistance"
    >
      <FormField
        label="Need Accommodation?"
        id="needsAccommodation"
        type="select"
        value={data.needsAccommodation ? 'yes' : 'no'}
        onChange={(value) => updateFields({ 
          needsAccommodation: value === 'yes',
          checkInDate: value === 'no' ? '' : data.checkInDate
        })}
        placeholder="Select option"
        required
        options={[
          { value: 'yes', label: 'Yes, I need accommodation' },
          { value: 'no', label: 'No, I have my own accommodation' }
        ]}
        fullWidth
      />

      {data.needsAccommodation && (
        <DatePicker
          label="Check-in Date"
          id="checkInDate"
          value={data.checkInDate}
          onChange={(value) => updateFields({ checkInDate: value })}
          placeholder="Select your check-in date"
          required
          description="When would you like to move in?"
          minDate={format(addDays(new Date(), 7), 'yyyy-MM-dd')}
          fullWidth
        />
      )}
    </FormSection>
  );
};

export default Accommodation; 