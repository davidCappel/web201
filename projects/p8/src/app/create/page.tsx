'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AttributeSelector from '../components/AttributeSelector';
import CategorySelector, { categories } from '../components/CategorySelector';
import { createSuperhero } from '../utils/api';
import { SuperheroFormData } from '../types/superhero';
import { toast } from 'react-hot-toast';

export default function CreateHero() {
  const router = useRouter();
  const [formData, setFormData] = useState<SuperheroFormData>({
    name: '',
    strength: 5,
    speed: 5,
    special_ability: '',
    category: '',
  });
  const [submitting, setSubmitting] = useState(false);

 
  const selectedCategory = categories.find(c => c.id === formData.category);
  
  
  useEffect(() => {
    if (selectedCategory) {
      let { strength, speed } = formData;
      
      
      if (selectedCategory.minStrength && strength < selectedCategory.minStrength) {
        strength = selectedCategory.minStrength;
      }
      if (selectedCategory.maxStrength && strength > selectedCategory.maxStrength) {
        strength = selectedCategory.maxStrength;
      }
      if (selectedCategory.minSpeed && speed < selectedCategory.minSpeed) {
        speed = selectedCategory.minSpeed;
      }
      if (selectedCategory.maxSpeed && speed > selectedCategory.maxSpeed) {
        speed = selectedCategory.maxSpeed;
      }
      
      
      if (strength !== formData.strength || speed !== formData.speed) {
        setFormData(prev => ({
          ...prev,
          strength,
          speed,
        }));
      }
    }
  }, [formData.category, selectedCategory, formData.strength, formData.speed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Please enter a hero name');
      return;
    }
    
    if (!formData.special_ability.trim()) {
      toast.error('Please enter a special ability');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const newHero = await createSuperhero(formData);
      
      if (newHero) {
        toast.success('Superhero created successfully!');
        router.push('/');
      } else {
        toast.error('Failed to create superhero');
      }
    } catch (error) {
      console.error('Error creating superhero:', error);
      toast.error('An error occurred while creating the superhero');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Create New Superhero</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl text-black mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Name field */}
        <div className="mb-6">
          <label 
            htmlFor="name" 
            className="block text-black font-bold mb-2"
          >
            Hero Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        
        {/* Category selection */}
        <CategorySelector 
          value={formData.category}
          onChange={(category) => setFormData({ ...formData, category })}
        />
        
        {/* Strength selector */}
        <AttributeSelector
          name="strength"
          label="Strength"
          value={formData.strength}
          onChange={(strength) => setFormData({ ...formData, strength })}
          min={selectedCategory?.minStrength || 1}
          max={selectedCategory?.maxStrength || 10}
        />
        
        {/* Speed selector */}
        <AttributeSelector
          name="speed"
          label="Speed"
          value={formData.speed}
          onChange={(speed) => setFormData({ ...formData, speed })}
          min={selectedCategory?.minSpeed || 1}
          max={selectedCategory?.maxSpeed || 10}
        />
        
        {/* Special ability field */}
        <div className="mb-6">
          <label 
            htmlFor="special_ability" 
            className="block text-black font-bold mb-2"
          >
            Special Ability
          </label>
          <textarea
            id="special_ability"
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={formData.special_ability}
            onChange={(e) => setFormData({ ...formData, special_ability: e.target.value })}
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create Superhero'}
          </button>
        </div>
      </form>
    </main>
  );
}