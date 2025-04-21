import supabase from './supabase';
import { Superhero, SuperheroFormData } from '../types/superhero';


export async function getAllSuperheroes(): Promise<Superhero[]> {
  const { data, error } = await supabase
    .from('superheroes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching superheroes:', error);
    return [];
  }

  return data || [];
}


export async function getSuperheroById(id: string): Promise<Superhero | null> {
  const { data, error } = await supabase
    .from('superheroes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching superhero with ID ${id}:`, error);
    return null;
  }

  return data;
}


export async function createSuperhero(superhero: SuperheroFormData): Promise<Superhero | null> {
  const { data, error } = await supabase
    .from('superheroes')
    .insert([superhero])
    .select()
    .single();

  if (error) {
    console.error('Error creating superhero:', error);
    return null;
  }

  return data;
}


export async function updateSuperhero(id: string, updates: Partial<SuperheroFormData>): Promise<Superhero | null> {
  const { data, error } = await supabase
    .from('superheroes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating superhero with ID ${id}:`, error);
    return null;
  }

  return data;
}


export async function deleteSuperhero(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('superheroes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting superhero with ID ${id}:`, error);
    return false;
  }

  return true;
}


export async function getSuperheroStats() {
  const { data, error } = await supabase
    .from('superheroes')
    .select('*');

  if (error) {
    console.error('Error fetching superhero stats:', error);
    return null;
  }

  const heroes = data || [];
  
  
  const highStrengthPercentage = heroes.length
    ? (heroes.filter(hero => hero.strength > 7).length / heroes.length) * 100
    : 0;

  
  const highSpeedPercentage = heroes.length
    ? (heroes.filter(hero => hero.speed > 7).length / heroes.length) * 100
    : 0;


  const overallSuccess = heroes.length
    ? (heroes.reduce((sum, hero) => sum + hero.strength + hero.speed, 0) / (heroes.length * 2 * 10)) * 100
    : 0;

  
  const categorySet = new Set<string>();
  heroes.forEach(hero => {
    if (hero.category) {
      categorySet.add(hero.category);
    }
  });
  const uniqueCategories = Array.from(categorySet);

  return {
    totalHeroes: heroes.length,
    highStrengthPercentage,
    highSpeedPercentage,
    overallSuccess,
    categories: uniqueCategories,
  };
}