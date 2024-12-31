'use client';

import { StepProps } from '@/types';
import FormField from '../ui/FormField';

const EmergencyContact: React.FC<StepProps> = ({ data, updateFields }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white bg-primary-navy -mx-8 -mt-8 p-8">
          Emergency Contact
        </h2>
        <div className="flex items-center space-x-3 mt-8">
          <div className="w-1 h-14 bg-primary-green"></div>
          <div>
            <h3 className="text-2xl text-primary-navy">Emergency Contact</h3>
            <p className="text-gray-600 mt-1">Who should we contact in case of emergency?</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-lg font-medium text-primary-navy">
            Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.emergencyName}
            onChange={(e) => updateFields({ emergencyName: e.target.value })}
            placeholder="Enter emergency contact name"
            className="w-full px-4 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-900 text-base shadow-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-primary-navy">
            Contact Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={data.emergencyPhone}
            onChange={(e) => updateFields({ emergencyPhone: e.target.value })}
            placeholder="Enter emergency contact phone"
            className="w-full px-4 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-900 text-base shadow-sm"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-lg font-medium text-primary-navy">
          Relationship <span className="text-red-500">*</span>
        </label>
        <select
          value={data.relationship}
          onChange={(e) => updateFields({ relationship: e.target.value })}
          className="w-full px-4 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-900 text-base shadow-sm"
          required
        >
          <option value="">Select relationship</option>
          <option value="parent">Parent</option>
          <option value="spouse">Spouse</option>
          <option value="sibling">Sibling</option>
          <option value="friend">Friend</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-lg font-medium text-primary-navy">
          Additional Notes
        </label>
        <textarea
          value={data.emergencyNotes || ''}
          onChange={(e) => updateFields({ emergencyNotes: e.target.value })}
          placeholder="Any additional information about your emergency contact"
          className="w-full px-4 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-900 text-base shadow-sm min-h-[120px] resize-none"
          rows={4}
        />
      </div>
    </div>
  );
};

export default EmergencyContact; 