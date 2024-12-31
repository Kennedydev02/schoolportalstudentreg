import FormSection from '../ui/FormSection';
import FormField from '../ui/FormField';
import { StepProps } from '@/types';

const EmergencyContact = ({ data, updateFields }: StepProps) => {
  return (
    <FormSection
      title="Emergency Contact"
      description="Who should we contact in case of emergency?"
    >
      <FormField
        label="Contact Name"
        id="emergencyName"
        value={data.emergencyName}
        onChange={(value) => updateFields({ emergencyName: value })}
        placeholder="Enter emergency contact name"
        required
      />

      <FormField
        label="Contact Phone"
        id="emergencyPhone"
        type="tel"
        value={data.emergencyPhone}
        onChange={(value) => updateFields({ emergencyPhone: value })}
        placeholder="Enter emergency contact number"
        required
      />

      <FormField
        label="Relationship"
        id="relationship"
        type="select"
        value={data.relationship}
        onChange={(value) => updateFields({ relationship: value })}
        placeholder="Select relationship"
        required
        options={[
          { value: 'Parent', label: 'Parent' },
          { value: 'Spouse', label: 'Spouse' },
          { value: 'Sibling', label: 'Sibling' },
          { value: 'Friend', label: 'Friend' },
          { value: 'Other', label: 'Other' }
        ]}
      />

      <FormField
        label="Additional Notes"
        id="emergencyNotes"
        value={data.emergencyNotes || ''}
        onChange={(value) => updateFields({ emergencyNotes: value })}
        placeholder="Any additional information about your emergency contact"
        multiline
        rows={3}
        fullWidth
      />
    </FormSection>
  );
};

export default EmergencyContact; 