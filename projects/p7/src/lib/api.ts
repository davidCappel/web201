
const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

export async function fetchRecipesByNutrients(params: {
  minProtein?: number;
  maxProtein?: number;
  minCalories?: number;
  maxCalories?: number;
  minCarbs?: number;
  maxCarbs?: number;
  number?: number;
  offset?: number;
}) {
  const queryParams = new URLSearchParams();
  
  
  queryParams.append('apiKey', API_KEY || '');
  
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });
  
  const response = await fetch(`${BASE_URL}/recipes/findByNutrients?${queryParams}`);
  
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  
  return response.json();
}

export async function getRecipeDetails(id: number) {
  const queryParams = new URLSearchParams();
  queryParams.append('apiKey', API_KEY || '');
  queryParams.append('includeNutrition', 'true');
  
  const response = await fetch(`${BASE_URL}/recipes/${id}/information?${queryParams}`);
  
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  
  return response.json();
}