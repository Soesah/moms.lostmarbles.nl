export interface Menu {
  id: number;
  date: string;
  year: number;
  week: number;
  subject: string;
  saturday: MealRef;
  sunday: MealRef;
  monday: MealRef;
  tuesday: MealRef;
  wednesday: MealRef;
  thursday: MealRef;
  friday: MealRef;
  next_week: string;
}

interface MealRef {
  id: number; // empty when out or leftovers or undecided. See notes
  date: string;
  out: boolean;
  left_overs: boolean;
  undecided: boolean;
  notes: string;
}

export interface Meal {
  id: number;
  name: string;
  name_variations: string[];
  ingredients: IngredientRef[];
  base_pasta: boolean;
  base_noodles: boolean;
  base_rice: boolean;
  base_potatoes: boolean;
  base_bread: boolean;
  base_wrap: boolean;
  type_vegetarian: boolean;
  type_chicken: boolean;
  type_beef: boolean;
  type_pork: boolean;
  type_fish: boolean;
  variation_of: string;
  recipe_urls: string[];
}

interface IngredientRef {
  id: number; // empty when not a real ingredient? See notes
  amount: string;
  unit: string;
  notes: string;
}

export interface Ingredient {
  id: number;
  name: string;
  name_variations: string[];
  type: string;
  notes?: string;
}

// export/import model
export interface ParsedMenu {
  id: number;
  file: string;
  date: string;
  subject: string;
  year: number;
  week: number;
  saturday: ParsedMenuDay;
  sunday: ParsedMenuDay;
  monday: ParsedMenuDay;
  tuesday: ParsedMenuDay;
  wednesday: ParsedMenuDay;
  thursday: ParsedMenuDay;
  friday: ParsedMenuDay;
  next_week: string;
  ingredients: ParsedIngredient[];
  analyzed: boolean;
}

export interface ParsedMenuDay {
  date: string;
  meal: string;
  urls?: string[];
  left_over?: boolean;
}

interface ParsedIngredient {
  name: string;
  amount: string;
  notes: string;
  optional: boolean;
}

export const baseMenu: Meal = {
  id: -1,
  name: '',
  name_variations: [],
  ingredients: [],
  base_rice: false,
  base_potatoes: false,
  base_noodles: false,
  base_pasta: false,
  base_bread: false,
  base_wrap: false,
  type_chicken: false,
  type_beef: false,
  type_pork: false,
  type_fish: false,
  type_vegetarian: false,
  variation_of: '',
  recipe_urls: [],
};
