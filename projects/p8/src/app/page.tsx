'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroCard from './components/HeroCard';
import HeroStats from './components/HeroStats';
import { getAllSuperheroes, getSuperheroStats } from './utils/api';
import { Superhero } from './types/superhero';

export default function Home() {
  const [heroes, setHeroes] = useState<Superhero[]>([]);
  const [stats, setStats] = useState({
    totalHeroes: 0,
    highStrengthPercentage: 0,
    highSpeedPercentage: 0,
    overallSuccess: 0,
    categories: [] as string[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [heroesData, statsData] = await Promise.all([
          getAllSuperheroes(),
          getSuperheroStats(),
        ]);
        
        setHeroes(heroesData);
        if (statsData) {
          setStats(statsData);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Superhero Team</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-2xl">Loading...</div>
        </div>
      ) : (
        <>
          {heroes.length > 0 ? (
            <>
              <HeroStats stats={stats} />
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Heroes ({heroes.length})</h2>
                <Link 
                  href="/create" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create New Hero
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {heroes.map((hero) => (
                  <HeroCard key={hero.id} hero={hero} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">You don't have any heroes yet!</h2>
              <p className="text-gray-600 mb-8">Create your first superhero to start building your team.</p>
              <Link 
                href="/create" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
              >
                Create Your First Hero
              </Link>
            </div>
          )}
        </>
      )}
    </main>
  );
}