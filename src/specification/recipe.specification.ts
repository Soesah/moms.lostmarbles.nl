import { Specification, some } from './specification';
import { Recipe, Ingredient } from '@/models/recipe.model';

const matchName = (searchValue: string): Specification<Recipe> => {
  return (input: Recipe): boolean =>
    input.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
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

export function createRecipeSpecification(
  searchValue: string,
): Specification<Recipe> {
  return some<Recipe>(
    matchName(searchValue),
    // matchIngredientName(searchValue),
    // matchIngredientRemark(searchValue),
  );
}
