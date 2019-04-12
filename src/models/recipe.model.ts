export interface RecipeData {
  id: number;
  category_id: number;
  language: string;
  slug: string;
  name: string;
  cook: string;
  servings: string;
  preparation_time: string;
  ingredients: Ingredient[];
  steps: Step[];
  notes: Note[];
  creation_date: string;
  modification_date: string;
}

export interface Ingredient {
  amount?: string;
  name: string;
  remark?: string;
}
export interface Step {
  step: string;
}
export interface Note {
  author: string;
  paragraph: string[];
}

export class Recipe {
  public id: number;
  public category_id: number;
  public language: string;
  public slug: string;
  public name: string;
  public cook: string;
  public servings: string;
  public preparation_time: string;
  public ingredients: Ingredient[];
  public steps: Step[];
  public notes: Note[];
  public creation_date: string;
  public modification_date: string;

  constructor(data: RecipeData) {
    this.id = data.id;
    this.category_id = data.category_id;
    this.language = data.language;
    this.slug = data.slug;
    this.name = data.name;
    this.cook = data.cook;
    this.servings = data.servings;
    this.preparation_time = data.preparation_time;
    this.ingredients = data.ingredients;
    this.steps = data.steps;
    this.notes = data.notes;
    this.creation_date = data.creation_date;
    this.modification_date = data.modification_date;
  }
}
