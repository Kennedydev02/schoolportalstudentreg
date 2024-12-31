'use client';

import { StepProps } from '@/types';
import FormField from '../ui/FormField';

const ContactInfo: React.FC<StepProps> = ({ data, updateFields }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary-navy dark:text-white">
        Contact Information
      </h2>
      
      <div className="space-y-4">
        <FormField
          label="Phone Number"
          type="tel"
          id="phone"
          value={data.phone}
          onChange={(value) => updateFields({ phone: value })}
          placeholder="Enter your phone number"
          required
        />

        <FormField
          label="Email"
          type="email"
          id="email"
          value={data.email}
          onChange={(value) => updateFields({ email: value })}
          placeholder="Enter your email address"
          required
        />

        <div className="space-y-2">
          <FormField
            label="Address"
            type="text"
            id="address"
            value={data.address}
            onChange={(value) => updateFields({ address: value })}
            placeholder="Enter your full address"
            required
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please provide your complete residential address
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo; 