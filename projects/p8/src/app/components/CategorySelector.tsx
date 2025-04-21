import React from 'react';

type CategorySelectorProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

// Define categories and their attribute restrictions
export const categories = [
  {
    id: 'speedster',
    name: 'Speedster',
    description: 'Heroes known for their incredible speed',
    minSpeed: 7,
    maxStrength: 8,
  },
  {
    id: 'powerhouse',
    name: 'Powerhouse',
    description: 'Heroes with extraordinary strength',
    minStrength: 7,
    maxSpeed: 8,
  },
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Heroes with well-rounded abilities',
    minSpeed: 4,
    minStrength: 4,
    maxSpeed: 8,
    maxStrength: 8,
  },
  {
    id: 'specialist',
    name: 'Specialist',
    description: 'Heroes with unique special abilities',
    // No specific restrictions
  },
];

const CategorySelector: React.FC<CategorySelectorProps> = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-black font-bold mb-2">
        Hero Category
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              value === category.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => onChange(category.id)}
          >
            <h3 className="font-bold text-lg">{category.name}</h3>
            <p className="text-black text-sm">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;