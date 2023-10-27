import { matches } from '@/util/string.util';

export const NEW_ITEM_ID = -1;

export interface Menu {
  id: number;
  date: string;
  year: number;
  week: number;
  saturday: MealRef;
  sunday: MealRef;
  monday: MealRef;
  tuesday: MealRef;
  wednesday: MealRef;
  thursday: MealRef;
  friday: MealRef;
  next_week: string;
  shopping_list: IngredientRef[];
}

export interface MealRef {
  date: string;
  meal_id?: number;
  combination_ids?: number[];
  notes?: string;
  is_out?: boolean;
  is_left_overs?: boolean;
  is_undecided?: boolean;
}

export interface Meal {
  id: number;
  name_nl: string;
  name_en?: string;
  name_id?: string;
  keywords: string[];
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
  variation_of: number;
  recipe_urls: string[];
  culture: string;
  has_left_overs: boolean;
}

export interface IngredientRef {
  id: number; // empty when not a real ingredient? See notes
  amount?: string;
  unit?: string;
  notes?: string;
}

export interface Ingredient {
  id: number;
  name_nl: string;
  name_en?: string;
  name_id?: string;
  keywords: string[];
  type?: string;
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

export interface ParsedIngredient {
  name: string;
  amount: string;
  notes: string;
  optional: boolean;
}

export const baseMeal: Meal = {
  id: NEW_ITEM_ID,
  name_nl: '',
  keywords: [],
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
  variation_of: -1,
  recipe_urls: [],
  culture: '',
  has_left_overs: false,
};

export const baseIngredient: Ingredient = {
  id: NEW_ITEM_ID,
  name_nl: '',
  keywords: [],
};

export const getIngredient = (
  name: string,
  ingredients: Ingredient[],
): Ingredient | null => {
  let ing = null;

  for (let index = 0; index < ingredients.length; index++) {
    const item = ingredients[index];

    if (
      matches(name, item.name_nl) ||
      matches(name, item.name_en) ||
      matches(name, item.name_id) ||
      (item.keywords || []).some((v) => matches(name, v))
    ) {
      ing = item;
    }
  }

  return ing;
};

export const getMeal = (name: string, meals: Meal[]): Meal | null => {
  let meal = null;

  for (let index = 0; index < meals.length; index++) {
    const item = meals[index];

    if (
      matches(name, item.name_nl) ||
      matches(name, item.name_en) ||
      matches(name, item.name_id) ||
      (item.keywords || []).some((v) => matches(name, v))
    ) {
      meal = item;
    }
  }

  return meal;
};

export const createMenu = (
  parsed: ParsedMenu,
  meals: Meal[],
  ingredients: Ingredient[],
): Menu => {
  const saturday = getMeal(parsed.saturday.meal, meals);
  const sunday = getMeal(parsed.sunday.meal, meals);
  const monday = getMeal(parsed.monday.meal, meals);
  const tuesday = getMeal(parsed.tuesday.meal, meals);
  const wednesday = getMeal(parsed.wednesday.meal, meals);
  const thursday = getMeal(parsed.thursday.meal, meals);
  const friday = getMeal(parsed.friday.meal, meals);

  const menu: Menu = {
    id: -1,
    date: parsed.date,
    year: parsed.year,
    week: parsed.week,
    saturday: {
      meal_id: saturday ? saturday.id : -1,
      date: parsed.saturday.date,
    },
    sunday: { meal_id: sunday ? sunday.id : -1, date: parsed.sunday.date },
    monday: { meal_id: monday ? monday.id : -1, date: parsed.monday.date },
    tuesday: { meal_id: tuesday ? tuesday.id : -1, date: parsed.tuesday.date },
    wednesday: {
      meal_id: wednesday ? wednesday.id : -1,
      date: parsed.wednesday.date,
    },
    thursday: {
      meal_id: thursday ? thursday.id : -1,
      date: parsed.thursday.date,
    },
    friday: { meal_id: friday ? friday.id : -1, date: parsed.friday.date },
    next_week: parsed.next_week,
    shopping_list: <IngredientRef[]>parsed.ingredients
      .map((ing): IngredientRef | null => {
        const ingredient = getIngredient(ing.name, ingredients);

        return ingredient
          ? {
              id: ingredient.id,
              amount: ing.amount,
              notes: ing.notes,
            }
          : null;
      })
      .filter((n) => !!n),
  };

  return menu;
};
