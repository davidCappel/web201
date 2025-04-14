"use client";

import React, { useState } from 'react';
import { Recipe } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DataVisualizationsProps {
  recipes: Recipe[];
}

const DataVisualizations: React.FC<DataVisualizationsProps> = ({ recipes }) => {
  const [activeChart, setActiveChart] = useState<'nutritionDistribution' | 'calorieComparison'>('nutritionDistribution');
  
  // Process data for the nutrition distribution chart
  const nutritionData = recipes.slice(0, 5).map(recipe => {
    return {
      name: recipe.title.length > 20 ? recipe.title.substring(0, 20) + '...' : recipe.title,
      protein: parseInt(recipe.protein.replace('g', '')),
      carbs: parseInt(recipe.carbs.replace('g', '')),
      fat: parseInt(recipe.fat.replace('g', ''))
    };
  });
  
  // Calculate protein to calorie ratio for recipes
  const proteinCalorieData = recipes.slice(0, 8).map(recipe => {
    const proteinValue = parseInt(recipe.protein.replace('g', ''));
    return {
      name: recipe.title.length > 15 ? recipe.title.substring(0, 15) + '...' : recipe.title,
      ratio: (proteinValue / recipe.calories * 100).toFixed(2),
      calories: recipe.calories,
      protein: proteinValue
    };
  }).sort((a, b) => parseFloat(b.ratio) - parseFloat(a.ratio));
  
  // Pie chart data for overall macronutrients
  const totalProtein = recipes.reduce((sum, recipe) => sum + parseInt(recipe.protein.replace('g', '')), 0);
  const totalCarbs = recipes.reduce((sum, recipe) => sum + parseInt(recipe.carbs.replace('g', '')), 0);
  const totalFat = recipes.reduce((sum, recipe) => sum + parseInt(recipe.fat.replace('g', '')), 0);
  
  const macroDistributionData = [
    { name: 'Protein', value: totalProtein },
    { name: 'Carbs', value: totalCarbs },
    { name: 'Fat', value: totalFat }
  ];
  
  const COLORS = ['#4CAF50', '#2196F3', '#FFC107'];
  
  return (
    <div className="bg-white rounded-lg shadow mb-6 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Data Visualizations</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-full ${activeChart === 'nutritionDistribution' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveChart('nutritionDistribution')}
          >
            Nutrition Distribution
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${activeChart === 'calorieComparison' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveChart('calorieComparison')}
          >
            Protein/Calorie Efficiency
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        {activeChart === 'nutritionDistribution' ? (
          <div>
            <p className="text-sm text-gray-600 mb-2">
              This chart shows the macronutrient breakdown for the top 5 recipes. It illustrates how protein, carbs, and fat content varies across different recipes.
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={nutritionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                  <YAxis label={{ value: 'Grams', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="protein" fill="#4CAF50" name="Protein (g)" />
                  <Bar dataKey="carbs" fill="#2196F3" name="Carbs (g)" />
                  <Bar dataKey="fat" fill="#FFC107" name="Fat (g)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600 mb-2">
              This chart ranks recipes by protein-to-calorie efficiency, showing which recipes provide the most protein for their caloric content. Higher values indicate more protein-efficient meals.
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={proteinCalorieData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                  <YAxis label={{ value: 'Protein per 100 calories (g)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => {
                    if (typeof value === 'number') {
                      return [`${value}`, 'g protein per 100 calories'];
                    }
                    return [`${value}`, 'g protein per 100 calories'];
                  }} />
                  <Legend />
                  <Bar dataKey="ratio" fill="#8884d8" name="Protein/Calorie Ratio" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <h4 className="text-md font-semibold mb-2">Overall Macro Distribution</h4>
        <p className="text-sm text-gray-600 mb-2">
          This pie chart shows the overall distribution of macronutrients across all recipes in your current selection.
        </p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={macroDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {macroDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => {
                if (typeof value === 'number') {
                  return `${Math.round(value)}g`;
                }
                return `${value}g`;
              }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizations;