
"use client";

import React from 'react';
import { useRecipes } from '../hooks/useRecipies';
import SearchBar from './Searchbar';
import Filters from './Filters';
import StatisticsPanel from './StatisticsPanel';
import RecipeCard from './RecipeCard';

const Dashboard: React.FC = () => {
  const { 
    recipes, 
    loading, 
    loadingDetails,
    error, 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters,
    statistics,
    expandedRecipeId,
    loadRecipeDetails
  } = useRecipes();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex justify-center">
        <div className='bg-gradient-to-br from-black to-slate-600 text-transparent bg-clip-text'>
            Fitness Food in My Mouth
        </div>
         
         </h1>
      
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <Filters filters={filters} setFilters={setFilters} />
      
      <StatisticsPanel statistics={statistics} />
      
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-lg text-red-800 mb-6">
          {error}
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No recipes found. Try adjusting your filters.
        </div>
      ) : (
        <div className="space-y-4">
          {recipes.slice(0, 10).map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              expanded={expandedRecipeId === recipe.id}
              onToggleExpand={() => loadRecipeDetails(recipe.id)}
              loading={loadingDetails && expandedRecipeId === recipe.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;