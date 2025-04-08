"use client";
import React from 'react';
import { FilterOptions } from '../lib/types';

interface FiltersProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: parseInt(value)
    });
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Calories Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Calories (min-max)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minCalories"
              value={filters.minCalories}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              min="0"
            />
            <span>-</span>
            <input
              type="number"
              name="maxCalories"
              value={filters.maxCalories}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              min="0"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Calories: {filters.maxCalories}
            </label>
            <input
              type="range"
              name="maxCalories"
              min="0"
              max="1000"
              value={filters.maxCalories}
              onChange={handleFilterChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        {/* Protein Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Protein (min-max)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minProtein"
              value={filters.minProtein}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              min="0"
            />
            <span>-</span>
            <input
              type="number"
              name="maxProtein"
              value={filters.maxProtein}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              min="0"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Protein: {filters.minProtein}g
            </label>
            <input
              type="range"
              name="minProtein"
              min="0"
              max="100"
              value={filters.minProtein}
              onChange={handleFilterChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        {/* Carbs Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Carbs (min-max)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minCarbs"
              value={filters.minCarbs}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              min="0"
            />
            <span>-</span>
            <input
              type="number"
              name="maxCarbs"
              value={filters.maxCarbs}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              min="0"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Carbs: {filters.maxCarbs}g
            </label>
            <input
              type="range"
              name="maxCarbs"
              min="0"
              max="100"
              value={filters.maxCarbs}
              onChange={handleFilterChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;