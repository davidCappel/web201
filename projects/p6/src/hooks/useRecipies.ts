"use client"
import { useState, useEffect } from 'react';
import { fetchRecipesByNutrients, getRecipeDetails} from '../lib/api';
import { Recipe, FilterOptions, RecipeStatistics,RecipeDetails  } from '../lib/types';

const DEFAULT_FILTERS: FilterOptions = {
  minProtein: 20,
  maxProtein: 100,
  minCalories: 0,
  maxCalories: 600,
  minCarbs: 0,
  maxCarbs: 50
};

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [expandedRecipeId, setExpandedRecipeId] = useState<number | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<RecipeStatistics>({
    totalRecipes: 0,
    averageCalories: 0,
    averageProtein: 0,
    highestProtein: { value: 0, recipe: '' },
    lowestCalorie: { value: 0, recipe: '' }
  });

  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await fetchRecipesByNutrients({
          ...filters,
          number: 30 
        });
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipes');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [filters]);

  const loadRecipeDetails = async (recipeId: number) => {
    // If we already have the details, just toggle expanded state
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe?.details) {
      setExpandedRecipeId(expandedRecipeId === recipeId ? null : recipeId);
      return;
    }

    try {
      setLoadingDetails(true);
      const details = await getRecipeDetails(recipeId);
      
      // Update the recipes array with the new details
      const updatedRecipes = recipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, details }
          : recipe
      );
      
      setRecipes(updatedRecipes);
      setExpandedRecipeId(recipeId);
    } catch (err) {
      console.error('Failed to fetch recipe details', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    const filtered = recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
    
    
    if (filtered.length > 0) {
      const totalCalories = filtered.reduce((sum, recipe) => sum + recipe.calories, 0);
      const totalProtein = filtered.reduce((sum, recipe) => {
        const proteinValue = parseInt(recipe.protein.replace('g', ''));
        return sum + (isNaN(proteinValue) ? 0 : proteinValue);
      }, 0);
      
      const highestProteinRecipe = [...filtered].sort((a, b) => {
        const proteinA = parseInt(a.protein.replace('g', ''));
        const proteinB = parseInt(b.protein.replace('g', ''));
        return proteinB - proteinA;
      })[0];
      
      const lowestCalorieRecipe = [...filtered].sort((a, b) => a.calories - b.calories)[0];
      
      setStatistics({
        totalRecipes: filtered.length,
        averageCalories: Math.round(totalCalories / filtered.length),
        averageProtein: Math.round(totalProtein / filtered.length),
        highestProtein: { 
          value: parseInt(highestProteinRecipe.protein.replace('g', '')), 
          recipe: highestProteinRecipe.title 
        },
        lowestCalorie: { 
          value: lowestCalorieRecipe.calories, 
          recipe: lowestCalorieRecipe.title 
        }
      });
    }
  }, [recipes, searchQuery]);

  return {
    recipes: filteredRecipes,
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
  };
}