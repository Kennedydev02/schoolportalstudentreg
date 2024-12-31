'use client';

import { StepProps } from '@/types';
import FormField from '../ui/FormField';

const ContactInfo: React.FC<StepProps> = ({ data, updateFields }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-primary-navy dark:text-white">
          Contact Details
        </h2>
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-primary-green"></div>
          <div>
            <h3 className="text-xl text-primary-navy dark:text-white">Contact Information</h3>
            <p className="text-gray-600 dark:text-gray-300">How can we reach you?</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          label="Email Address"
          type="email"
          id="email"
          value={data.email}
          onChange={(value) => updateFields({ email: value })}
          placeholder="Enter your email address"
          required
        />
      </div>

      <div className="space-y-2">
        <FormField
          label="Address"
          type="text"
          id="address"
          value={data.address}
          onChange={(value) => updateFields({ address: value })}
          placeholder="Enter your complete residential address"
          required
          fullWidth
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please provide your complete residential address
        </p>
      </div>
    </div>
  );
};

export default ContactInfo; 