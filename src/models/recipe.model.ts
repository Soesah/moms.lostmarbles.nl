export interface RecipeData {
  id: number;
  category_id: number;
  language: string;
  slug: string;
  name: string;
  cook: string;
  image: string;
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
  contents: string;
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
  public image: string;
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
    this.image = data.image;
    this.servings = data.servings;
    this.preparation_time = data.preparation_time;
    this.ingredients = data.ingredients;
    this.steps = data.steps || [];
    this.notes = data.notes;
    this.creation_date = data.creation_date;
    this.modification_date = data.modification_date;
  }
}

export const getRecipeBackendData = (recipe: Recipe) => {
  return {
    id: recipe.id,
    category_id: recipe.category_id,
    language: recipe.language,
    slug: slugify(recipe.name),
    name: recipe.name,
    servings: recipe.servings,
    preparation_time: recipe.preparation_time,
    creation_date: recipe.creation_date,
    modification_date: new Date().toISOString(),
    xml: getXMLData(recipe),
  };
};

const slugify = (str: string): string => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

const getXMLData = (recipe: Recipe): string => {
  const ingredients = recipe.ingredients.reduce(
    (acc: string, ing: Ingredient) => {
      const amount = ing.amount ? `<amount>${ing.amount}</amount>` : '';
      const remark = ing.remark ? `<remark>${ing.remark}</remark>` : '';
      return `${acc}<ingredient><name>${
        ing.name
      }</name>${amount}${remark}</ingredient>`;
    },
    '',
  );
  const preparation = recipe.steps.reduce((acc: string, step: Step) => {
    return `${acc}<step>${step.contents}</step>`;
  }, '');
  const notes = (recipe.notes || []).reduce((acc: string, note: Note) => {
    return `${acc}<note><author>${note.author}</author>${note.paragraph
      .map((p) => `<paragraph>${p}</paragraph>`)
      .join('')}</note>`;
  }, '');

  return `
    <title>${recipe.name}</title>
    <cook>${recipe.cook}</cook>
    <ingredients>${ingredients}</ingredients>
    <preparation>${preparation}</preparation>
    <notes>${notes}</notes>
  `;
};
