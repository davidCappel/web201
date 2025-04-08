
"use client";

import React from 'react';
import { Recipe } from '../lib/types';
import Image from 'next/image';

interface RecipeCardProps {
  recipe: Recipe;
  expanded: boolean;
  onToggleExpand: () => void;
  loading: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  expanded, 
  onToggleExpand,
  loading
}) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
      <div 
        className="flex items-center p-4 cursor-pointer"
        onClick={onToggleExpand}
      >
        <div className="flex-shrink-0 w-24 h-24 relative rounded overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="ml-4 flex-1">
          <h3 className="font-semibold text-lg">{recipe.title}</h3>
          
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
              {recipe.calories} kcal
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
              Protein: {recipe.protein}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
              Carbs: {recipe.carbs}
            </span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
              Fat: {recipe.fat}
            </span>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <button 
            className="text-gray-500 hover:text-gray-700"
            aria-label={expanded ? "Collapse recipe" : "Expand recipe"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
            </div>
          ) : recipe.details ? (
            <div>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Summary</h4>
                <div 
                  dangerouslySetInnerHTML={{ __html: recipe.details.summary }} 
                  className="text-sm text-gray-600"
                />
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Ingredients</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  {recipe.details.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Instructions</h4>
                <div 
                  dangerouslySetInnerHTML={{ __html: recipe.details.instructions }} 
                  className="text-sm text-gray-600"
                />
              </div>
              
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <div>Ready in {recipe.details.readyInMinutes} minutes • {recipe.details.servings} servings</div>
                <a 
                  href={recipe.details.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Source: {recipe.details.sourceName}
                </a>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 py-4 text-center">
              Failed to load recipe details. Please try again.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeCard;