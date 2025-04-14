"use client";

import React from 'react';
import Link from 'next/link';
import SearchBar from './Searchbar';
import Filters from './Filters';
import ChartToggle from './ChartToggle';
import { useRecipes } from '../hooks/useRecipies';

const Sidebar = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters,
    showCharts,
    setShowCharts
  } = useRecipes();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Link href="/" className="block mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recipe Dashboard</h2>
      </Link>
      
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <Filters filters={filters} setFilters={setFilters} />
      
      <ChartToggle showCharts={showCharts} setShowCharts={setShowCharts} />
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">About the Data</h3>
        <p className="text-sm text-gray-600 mb-3">
          This dashboard presents nutritional data from various recipes, focusing on protein, carbs, and calorie content.
        </p>
        <p className="text-sm text-gray-600 mb-3">
          Try filtering for high protein (30g+) and low carb (&lt;30g) options for fitness-focused meals.
        </p>
        <p className="text-sm text-gray-600">
          Each recipe can be clicked to view more detailed nutritional information and preparation instructions.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;