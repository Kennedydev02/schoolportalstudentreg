'use client';

import { StepProps } from '@/types';
import FormField from '../ui/FormField';

const EmergencyContact: React.FC<StepProps> = ({ data, updateFields }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary-navy dark:text-white">
        Emergency Contact
      </h2>
      
      <div className="space-y-4">
        <FormField
          label="Emergency Contact Name"
          type="text"
          id="emergencyName"
          value={data.emergencyName}
          onChange={(value) => updateFields({ emergencyName: value })}
          placeholder="Enter emergency contact's full name"
          required
        />

        <FormField
          label="Emergency Contact Phone"
          type="tel"
          id="emergencyPhone"
          value={data.emergencyPhone}
          onChange={(value) => updateFields({ emergencyPhone: value })}
          placeholder="Enter emergency contact's phone number"
          required
        />

        <FormField
          label="Relationship to Student"
          type="text"
          id="relationship"
          value={data.relationship}
          onChange={(value) => updateFields({ relationship: value })}
          placeholder="e.g., Parent, Sibling, Guardian"
          required
        />

        <div className="space-y-2">
          <label 
            htmlFor="emergencyNotes" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Additional Notes
          </label>
          <textarea
            id="emergencyNotes"
            value={data.emergencyNotes || ''}
            onChange={(e) => updateFields({ emergencyNotes: e.target.value })}
            placeholder="Any additional information about your emergency contact"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-green focus:border-primary-green dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact; 