'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSuperheroById } from '../../utils/api';
import { Superhero } from '../../types/superhero';
import { categories } from '../../components/CategorySelector';
import { toast, Toaster } from 'react-hot-toast';

export default function HeroDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [hero, setHero] = useState<Superhero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHero() {
      try {
        const heroData = await getSuperheroById(id);
        
        if (heroData) {
          setHero(heroData);
        } else {
          toast.error('Superhero not found');
          router.push('/');
        }
      } catch (error) {
        console.error('Error loading superhero:', error);
        toast.error('Failed to load superhero');
        router.push('/');
      } finally {
        setLoading(false);
      }
    }
    
    loadHero();
  }, [id, router]);

  if (loading) {
    return (
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-black">Superhero Details</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-2xl">Loading...</div>
        </div>
      </main>
    );
  }

  if (!hero) {
    return (
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-black">Superhero Not Found</h1>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-black mb-4">Superhero not found</h2>
          <p className="text-gray-600 mb-8">The superhero you're looking for doesn't exist or has been deleted.</p>
          <Link 
            href="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Return to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const category = categories.find(c => c.id === hero.category);
  const createdDate = new Date(hero.created_at).toLocaleDateString();
  
  return (
    <main className="container mx-auto py-8 px-4">
      <Toaster position="bottom-right" />
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold text-gray-800">{hero.name}</h1>
            
            <Link 
              href={`/edit/${hero.id}`} 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
          </div>
          
          {hero.category && (
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {category?.name || hero.category}
              </span>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-700">Attributes</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-600">Strength</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                      <div
                        className="bg-red-500 h-4 rounded-full"
                        style={{ width: `${(hero.strength / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-xl min-w-[2rem] text-center">{hero.strength}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-600">Speed</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                      <div
                        className="bg-blue-500 h-4 rounded-full"
                        style={{ width: `${(hero.speed / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-xl min-w-[2rem] text-center">{hero.speed}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-700">Special Ability</h2>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700">{hero.special_ability}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4 text-sm text-gray-500">
            <p>Hero created on {createdDate}</p>
            <p>Hero ID: {hero.id}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to All Heroes
        </Link>
      </div>
    </main>
  );
}