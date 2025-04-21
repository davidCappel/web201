import React from 'react';

type AttributeSelectorProps = {
  name: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

const AttributeSelector: React.FC<AttributeSelectorProps> = ({
  name,
  label,
  value,
  onChange,
  min = 1,
  max = 10
}) => {
  const options = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="flex space-x-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
              value === option
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AttributeSelector;