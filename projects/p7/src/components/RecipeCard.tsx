"use client";

import React from 'react';
import { Recipe } from '../lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
        <div className="flex items-center p-4">
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
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;