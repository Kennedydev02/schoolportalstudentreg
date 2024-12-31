import FormSection from '../ui/FormSection';
import FormField from '../ui/FormField';
import { StepProps } from '@/types';

const ContactInfo = ({ data, updateFields }: StepProps) => {
  return (
    <FormSection
      title="Contact Information"
      description="How can we reach you?"
    >
      <FormField
        label="Phone Number"
        id="phone"
        type="tel"
        value={data.phone}
        onChange={(value) => updateFields({ phone: value })}
        placeholder="Enter your phone number"
        required
      />

      <FormField
        label="Email Address"
        id="email"
        type="email"
        value={data.email}
        onChange={(value) => updateFields({ email: value })}
        placeholder="Enter your email address"
        required
      />

      <FormField
        label="Address"
        id="address"
        value={data.address}
        onChange={(value) => updateFields({ address: value })}
        placeholder="Enter your full address"
        required
        description="Please provide your complete residential address"
        multiline
        rows={4}
        fullWidth
      />
    </FormSection>
  );
};

export default ContactInfo; 