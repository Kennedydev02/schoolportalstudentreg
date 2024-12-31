'use client';

import { StepProps } from '@/types';
import FormField from '../ui/FormField';

const AirportPickup: React.FC<StepProps> = ({ data, updateFields }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary-navy dark:text-white">
        Airport Pickup
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Do you need airport pickup?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                data.needsAirportPickup
                  ? 'border-primary-green bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-green'
              }`}
              onClick={() => updateFields({ needsAirportPickup: true })}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="airportPickup"
                  checked={data.needsAirportPickup}
                  onChange={() => updateFields({ needsAirportPickup: true })}
                  className="h-4 w-4 text-primary-green focus:ring-primary-green"
                />
                <span className="ml-3 font-medium dark:text-white">Yes</span>
              </div>
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                !data.needsAirportPickup
                  ? 'border-primary-green bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-green'
              }`}
              onClick={() => updateFields({ needsAirportPickup: false })}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="airportPickup"
                  checked={!data.needsAirportPickup}
                  onChange={() => updateFields({ needsAirportPickup: false })}
                  className="h-4 w-4 text-primary-green focus:ring-primary-green"
                />
                <span className="ml-3 font-medium dark:text-white">No</span>
              </div>
            </div>
          </div>
        </div>

        {data.needsAirportPickup && (
          <>
            <FormField
              label="Arrival Date"
              id="arrivalDate"
              type="date"
              value={data.arrivalDate}
              onChange={(value) => updateFields({ arrivalDate: value })}
              placeholder="Select your arrival date"
              required
            />

            <FormField
              label="Arrival Time"
              id="arrivalTime"
              type="time"
              value={data.arrivalTime}
              onChange={(value) => updateFields({ arrivalTime: value })}
              placeholder="Enter your arrival time"
              required
            />

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <p className="text-sm text-blue-700 dark:text-blue-200">
                Airport pickup is available for Seattle-Tacoma International Airport (SEA) only.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AirportPickup; 