interface FormSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FormSection = ({ title, description, children }: FormSectionProps) => {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-l-4 border-[#76B95E] pl-4 mb-8">
        <h3 className="text-lg font-semibold text-[#1B2B5E] dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection; 