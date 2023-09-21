export interface ParsedMenu {
  id: number;
  file: string;
  date: string;
  subject: string;
  year: string;
  week: string;
  saturday: ParsedMenuDay;
  sunday: ParsedMenuDay;
  monday: ParsedMenuDay;
  tuesday: ParsedMenuDay;
  wednesday: ParsedMenuDay;
  thursday: ParsedMenuDay;
  friday: ParsedMenuDay;
  next_week: ParsedMenuDay;
  ingredients: ParsedIngredient[];
  analyzed: boolean;
}

interface ParsedMenuDay {
  date: string;
  meal: string;
  urls: string[];
  left_over: boolean;
}

interface ParsedIngredient {
  name: string;
  amount: string;
  notes: string;
  optional: boolean;
}
