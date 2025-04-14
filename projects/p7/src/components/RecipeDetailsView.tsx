"use client";

import React from 'react';
import { RecipeDetails } from '@/lib/types';
import Image from 'next/image';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface RecipeDetailsViewProps {
  recipe: RecipeDetails;
}

const RecipeDetailsView: React.FC<RecipeDetailsViewProps> = ({ recipe }) => {
  // Calculate macronutrient data for the pie chart
  const nutritionData = [
    { name: 'Protein', value: recipe.nutrition?.nutrients.find(n => n.name === 'Protein')?.amount || 0 },
    { name: 'Carbs', value: recipe.nutrition?.nutrients.find(n => n.name === 'Carbohydrates')?.amount || 0 },
    { name: 'Fat', value: recipe.nutrition?.nutrients.find(n => n.name === 'Fat')?.amount || 0 },
  ];

  const COLORS = ['#4CAF50', '#2196F3', '#FFC107'];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
            Ready in {recipe.readyInMinutes} minutes
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
            {recipe.servings} servings
          </span>
          {recipe.vegetarian && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
              Vegetarian
            </span>
          )}
          {recipe.vegan && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
              Vegan
            </span>
          )}
          {recipe.glutenFree && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
              Gluten Free
            </span>
          )}
          {recipe.dairyFree && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
              Dairy Free
            </span>
          )}
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Summary</h2>
          <div 
            dangerouslySetInnerHTML={{ __html: recipe.summary }} 
            className="text-gray-700"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Nutrition Information</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={nutritionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {nutritionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                            formatter={(value) => {
                              if (typeof value === 'number') {
                                return `${Math.round(value)}g`;
                              }
                              return `${value}g`;
                            }} 
                          />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4">
              {recipe.nutrition?.nutrients.slice(0, 8).map((nutrient) => (
                <div key={nutrient.name} className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">{nutrient.name}</span>
                  <span className="font-medium">{Math.round(nutrient.amount)}{nutrient.unit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id} className="mb-1">{ingredient.original}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Instructions</h2>
          {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
            <ol className="list-decimal pl-5">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number} className="mb-2">
                  <div className="text-gray-700">{step.step}</div>
                </li>
              ))}
            </ol>
          ) : (
            <div 
              dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
              className="text-gray-700"
            />
          )}
        </div>
        
        <div className="mt-6 text-sm text-gray-500 flex justify-between items-center">
          <span>Source: {recipe.sourceName}</span>
          <a 
            href={recipe.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Original Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsView;