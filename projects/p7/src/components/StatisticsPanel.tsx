"use client";
import React from 'react';
import { RecipeStatistics } from '../lib/types';

interface StatisticsPanelProps {
  statistics: RecipeStatistics;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ statistics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-100 p-4 rounded-lg shadow">
        <h3 className="font-semibold text-blue-800">Recipe Stats</h3>
        <div className="mt-2">
          <p className="text-2xl font-bold">{statistics.totalRecipes}</p>
          <p className="text-sm text-blue-700">Total Recipes</p>
        </div>
      </div>
      
      <div className="bg-green-100 p-4 rounded-lg shadow">
        <h3 className="font-semibold text-green-800">Nutrition Averages</h3>
        <div className="mt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700">Avg. Calories:</span>
            <span className="font-bold">{statistics.averageCalories} kcal</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-green-700">Avg. Protein:</span>
            <span className="font-bold">{statistics.averageProtein}g</span>
          </div>
        </div>
      </div>
      
      <div className="bg-purple-100 p-4 rounded-lg shadow">
        <h3 className="font-semibold text-purple-800">Highlights</h3>
        <div className="mt-2">
          <div className="text-sm text-purple-700">Highest Protein:</div>
          <div className="font-semibold truncate">{statistics.highestProtein.recipe} ({statistics.highestProtein.value}g)</div>
          <div className="text-sm text-purple-700 mt-1">Lowest Calorie:</div>
          <div className="font-semibold truncate">{statistics.lowestCalorie.recipe} ({statistics.lowestCalorie.value} kcal)</div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;