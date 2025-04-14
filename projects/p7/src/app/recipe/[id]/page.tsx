"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getRecipeDetails } from '@/lib/api';
import { RecipeDetails as RecipeDetailsType } from '@/lib/types';
import Sidebar from '@/components/Sidebar';
import RecipeDetailsView from '@/components/RecipeDetailsView';

export default function RecipeDetailsPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        setLoading(true);
        const details = await getRecipeDetails(id);
        setRecipeDetails(details);
      } catch (err) {
        setError('Failed to load recipe details');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-600 to-green-950 via-yellow-400">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex justify-center">
          <div className='bg-gradient-to-br from-black to-slate-600 text-transparent bg-clip-text'>
            Fitness Food in My Mouth
          </div>
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <Sidebar />
          </div>
          
          <div className="md:w-3/4">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-100 p-4 rounded-lg text-red-800">
                {error}
              </div>
            ) : recipeDetails ? (
              <RecipeDetailsView recipe={recipeDetails} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                Recipe not found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}