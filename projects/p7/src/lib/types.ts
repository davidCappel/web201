export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  calories: number;
  protein: string;
  fat: string;
  carbs: string;
  details?: RecipeDetails;
}

export interface FilterOptions {
  minProtein: number;
  maxProtein: number;
  minCalories: number;
  maxCalories: number;
  minCarbs: number;
  maxCarbs: number;
}

export interface RecipeStatistics {
  totalRecipes: number;
  averageCalories: number;
  averageProtein: number;
  highestProtein: { value: number; recipe: string };
  lowestCalorie: { value: number; recipe: string };
}

export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  sourceName: string;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
  nutrition?: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  };
  analyzedInstructions?: {
    steps: {
      number: number;
      step: string;
    }[];
  }[];
  extendedIngredients: {
    id: number;
    original: string;
    amount: number;
    unit: string;
    name: string;
  }[];
}