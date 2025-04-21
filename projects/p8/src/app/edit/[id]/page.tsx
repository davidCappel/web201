'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AttributeSelector from '../../components/AttributeSelector';
import CategorySelector, { categories } from '../../components/CategorySelector';
import { getSuperheroById, updateSuperhero, deleteSuperhero } from '../../utils/api';
import { SuperheroFormData } from '../../types/superhero';
import { toast, Toaster } from 'react-hot-toast';

export default function EditHero({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  
  const [formData, setFormData] = useState<SuperheroFormData>({
    name: '',
    strength: 5,
    speed: 5,
    special_ability: '',
    category: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Get the selected category details
  const selectedCategory = categories.find(c => c.id === formData.category);

  useEffect(() => {
    async function loadHero() {
      try {
        const hero = await getSuperheroById(id);
        
        if (hero) {
          setFormData({
            name: hero.name,
            strength: hero.strength,
            speed: hero.speed,
            special_ability: hero.special_ability,
            category: hero.category || '',
          });
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

  // Apply category restrictions to attributes
  useEffect(() => {
    if (selectedCategory) {
      let { strength, speed } = formData;
      
      // Apply min/max restrictions based on category
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
      
      // Update form data if changes were made
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
      const updatedHero = await updateSuperhero(id, formData);
      
      if (updatedHero) {
        toast.success('Superhero updated successfully!');
        router.push(`/hero/${id}`);
      } else {
        toast.error('Failed to update superhero');
      }
    } catch (error) {
      console.error('Error updating superhero:', error);
      toast.error('An error occurred while updating the superhero');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this superhero? This action cannot be undone.')) {
      return;
    }
    
    setDeleting(true);
    
    try {
      const success = await deleteSuperhero(id);
      
      if (success) {
        toast.success('Superhero deleted successfully');
        router.push('/');
      } else {
        toast.error('Failed to delete superhero');
      }
    } catch (error) {
      console.error('Error deleting superhero:', error);
      toast.error('An error occurred while deleting the superhero');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Superhero</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-2xl">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <Toaster position="bottom-right" />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Superhero</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Name field */}
        <div className="mb-6">
          <label 
            htmlFor="name" 
            className="block text-gray-700 font-bold mb-2"
          >
            Hero Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="block text-gray-700 font-bold mb-2"
          >
            Special Ability
          </label>
          <textarea
            id="special_ability"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={formData.special_ability}
            onChange={(e) => setFormData({ ...formData, special_ability: e.target.value })}
            required
          />
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Superhero'}
          </button>
          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
      
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