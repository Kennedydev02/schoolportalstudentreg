import React from 'react';
import { StepProps } from '../../types';
import FormSection from '../ui/FormSection';
import FormField from '../ui/FormField';
import DatePicker from '../ui/DatePicker';
import { format, addDays } from 'date-fns';

const AirportPickup = ({ data, updateFields }: StepProps) => {
  return (
    <FormSection
      title="Airport Pickup"
      description="Do you need transportation from the airport?"
    >
      <FormField
        label="Need Airport Pickup?"
        id="needsAirportPickup"
        type="select"
        value={data.needsAirportPickup ? 'yes' : 'no'}
        onChange={(value) => updateFields({ 
          needsAirportPickup: value === 'yes',
          arrivalDate: value === 'no' ? '' : data.arrivalDate,
          arrivalTime: value === 'no' ? '' : data.arrivalTime
        })}
        placeholder="Select option"
        required
        options={[
          { value: 'yes', label: 'Yes, I need airport pickup' },
          { value: 'no', label: 'No, I have my own transportation' }
        ]}
        fullWidth
      />

      {data.needsAirportPickup && (
        <>
          <DatePicker
            label="Arrival Date"
            id="arrivalDate"
            value={data.arrivalDate}
            onChange={(value) => updateFields({ arrivalDate: value })}
            placeholder="Select your arrival date"
            required
            description="When will you arrive?"
            minDate={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
          />

          <FormField
            label="Arrival Time"
            id="arrivalTime"
            type="time"
            value={data.arrivalTime}
            onChange={(value) => updateFields({ arrivalTime: value })}
            placeholder="Enter your arrival time"
            required
            description="What time will you arrive?"
          />
        </>
      )}
    </FormSection>
  );
};

export default AirportPickup; 