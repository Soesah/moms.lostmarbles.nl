package recipe

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/api"
	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

// GetRecipeList returns a list of recipes
func GetRecipeList(r *http.Request) ([]models.RecipeItem, error) {
	var recipes []models.Recipe
	var items []models.RecipeItem

	ctx := appengine.NewContext(r)

	qr := datastore.NewQuery(api.RecipeKind)
	_, err := qr.GetAll(ctx, &recipes)
	if err != nil {
		return items, err
	}

	threemonths, _ := time.ParseDuration("2160h")

	for _, recipe := range recipes {
		ingredients, err := getRecipeIngredients(ctx, recipe)

		if err != nil {
			return items, err
		}

		recipeJSON := models.RecipeJSON{
			XML: recipe.XML,
		}

		steps, err := recipeJSON.GetSteps()

		if err != nil {
			return items, err
		}

		items = append(items, models.RecipeItem{
			ID:          recipe.ID,
			CategoryID:  recipe.CategoryID,
			Slug:        recipe.Slug,
			Name:        recipe.Name,
			Ingredients: ingredients,
			Steps:       steps,
			IsNew:       recipe.CreationDate.After(time.Now().Add(-threemonths)),
		})
	}

	return items, nil
}

func getRecipeIngredients(ctx context.Context, recipe models.Recipe) ([]models.Ingredient, error) {
	var ingredients []models.Ingredient
	recipeKey := api.RecipeKey(ctx, recipe.ID, recipe.CategoryID)

	q := datastore.NewQuery(api.IngredientKind).Ancestor(recipeKey)
	_, err := q.GetAll(ctx, &ingredients)
	if err != nil {
		return ingredients, err
	}

	return ingredients, nil
}

// GetNewRecipes returns the latest two recipe
func GetNewRecipes(r *http.Request) ([]models.Recipe, error) {
	ctx := appengine.NewContext(r)
	var recipes []models.Recipe

	q := datastore.NewQuery(api.RecipeKind).Order("-CreationDate")

	_, err := q.GetAll(ctx, &recipes)

	if err != nil {
		return recipes, err
	}

	return recipes[0:2], nil
}

// CreateRecipe creates a recipe
func CreateRecipe() {

}

// GetRecipe returns a recipe
func GetRecipe(ID int64, categoryID int64, r *http.Request) (models.RecipeJSON, error) {
	var recipe models.Recipe
	var json models.RecipeJSON
	ctx := appengine.NewContext(r)
	key := api.RecipeKey(ctx, ID, categoryID)

	err := datastore.Get(ctx, key, &recipe)

	if err != nil {
		return json, err
	}
	json = models.RecipeJSON{
		ID:               recipe.ID,
		CategoryID:       recipe.CategoryID,
		Language:         recipe.Language,
		Slug:             recipe.Slug,
		Name:             recipe.Name,
		Servings:         recipe.Servings,
		PreparationTime:  recipe.PreparationTime,
		XML:              recipe.XML,
		CreationDate:     recipe.CreationDate,
		ModificationDate: recipe.ModificationDate,
	}
	ingredients, err := json.GetIngredients()
	if err != nil {
		json.Ingredients = make([]models.Ingredient, 0)
	}
	json.Ingredients = ingredients
	cook, err := json.GetCook()
	if err != nil {
		json.Cook = ""
	}
	json.Cook = cook
	steps, err := json.GetSteps()
	if err != nil {
		json.Steps = make([]models.Step, 0)
	}
	json.Steps = steps
	notes, err := json.GetNotes()
	if err != nil {
		json.Notes = make([]models.Note, 0)
	}
	json.Notes = notes

	return json, nil
}

// UpdateIngredients updates ingredients for the recipe
func UpdateIngredients(ctx context.Context, recipe models.Recipe) error {
	var ingredients []models.Ingredient
	var ingredientKeys []*datastore.Key

	err := DeleteIngredients(ctx, recipe)
	if err != nil {
		return err
	}

	recipeIngredients, err := recipe.GetIngredients()
	if err != nil {
		return errors.New("Error parsing ingredients for recipe " + recipe.Name + ":" + err.Error())
	}

	for _, ingredient := range recipeIngredients {
		ingredientKeys = append(ingredientKeys, api.IngredientKey(ctx, ingredient.Name, recipe.ID, recipe.CategoryID))
		ingredients = append(ingredients, ingredient)
	}

	_, err = datastore.PutMulti(ctx, ingredientKeys, ingredients)
	if err != nil {
		return err
	}
	return nil
}

// DeleteIngredients deletes ingredients of a recipe
func DeleteIngredients(ctx context.Context, recipe models.Recipe) error {
	var ingredients []models.Ingredient
	key := api.RecipeKey(ctx, recipe.ID, recipe.CategoryID)

	q := datastore.NewQuery(api.IngredientKind).Ancestor(key)
	keys, err := q.GetAll(ctx, &ingredients)
	if err != nil {
		return err
	}

	err = datastore.DeleteMulti(ctx, keys)

	if err != nil {
		return err
	}

	return nil
}

// UpdateRecipe updates a recipe
func UpdateRecipe(recipe models.Recipe, r *http.Request) (models.Recipe, error) {
	// changelog
	ctx := appengine.NewContext(r)
	key := api.RecipeKey(ctx, recipe.ID, recipe.CategoryID)

	UpdateIngredients(ctx, recipe)

	_, err := datastore.Put(ctx, key, &recipe)
	if err != nil {
		return recipe, err
	}

	return recipe, nil
}

// DeleteRecipe deletes a recipe
func DeleteRecipe() {

}
