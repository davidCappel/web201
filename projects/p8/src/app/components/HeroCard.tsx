import React from 'react';
import Link from 'next/link';
import { Superhero } from '@/app/types/superhero';
import { categories } from './CategorySelector';

type HeroCardProps = {
  hero: Superhero;
  showActions?: boolean;
  showCategory?: boolean;
};

const HeroCard: React.FC<HeroCardProps> = ({ 
  hero, 
  showActions = true,
  showCategory = true
}) => {
  const category = categories.find(c => c.id === hero.category);
  
  return (
    <div className="border rounded-lg shadow-md bg-white overflow-hidden transition-all hover:shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-black mb-2">{hero.name}</h2>
        
        {showCategory && hero.category && (
          <div className="mb-3">
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {category?.name || hero.category}
            </span>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-black text-sm">Strength</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{ width: `${(hero.strength / 10) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{hero.strength}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-black text-sm">Speed</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${(hero.speed / 10) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{hero.speed}</span>
            </div>
          </div>
        </div>
        
        {showActions && (
          <div className="flex justify-between mt-4">
            <Link 
              href={`/hero/${hero.id}`} 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View Details
            </Link>
            <Link 
              href={`/edit/${hero.id}`} 
              className="text-black hover:text-gray-800 font-medium"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCard;