import { Specification, all, some } from './specification';
import { Recipe, Ingredient } from '@/models/recipe.model';
import { Step } from '../models/recipe.model';

const matchName = (searchValue: string): Specification<Recipe> => {
  return (input: Recipe): boolean =>
    input.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
};

const matchCook = (searchValue: string): Specification<Recipe> => {
  return (input: Recipe): boolean =>
    input.cook.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
};

const matchCategory = (category_id: number): Specification<Recipe> => {
  return (input: Recipe): boolean =>
    category_id > -1 ? input.category_id === category_id : true;
};

const matchIngredientName = (searchValue: string): Specification<Recipe> => {
  return (input: Recipe): boolean =>
    input.ingredients.some(
      (ingredient: Ingredient) =>
        ingredient.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1,
    );
};

const matchIngredientRemark = (searchValue: string): Specification<Recipe> => {
  return (input: Recipe): boolean =>
    input.ingredients.some((ingredient: Ingredient) =>
      ingredient.remark
        ? ingredient.remark.toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1
        : false,
    );
};

const matchSteps = (searchValue: string): Specification<Recipe> => {
  return (input: Recipe): boolean =>
    input.steps.some((step: Step) =>
      step.contents
        ? step.contents.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        : false,
    );
};

export const createRecipeSpecification = (
  searchValue: string,
  category_id: number,
): Specification<Recipe> => {
  return all<Recipe>(
    matchCategory(category_id),
    some<Recipe>(
      matchName(searchValue),
      matchCook(searchValue),
      matchIngredientName(searchValue),
      matchIngredientRemark(searchValue),
      matchSteps(searchValue),
    ),
  );
};
