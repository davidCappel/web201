export type Superhero = {
  id: string;
  created_at: string;
  name: string;
  strength: number;
  speed: number;
  special_ability: string;
  category?: string;
};

export type SuperheroFormData = Omit<Superhero, 'id' | 'created_at'>;