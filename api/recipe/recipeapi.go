package recipe

import (
	"net/http"
	"sort"

	"github.com/Soesah/moms.lostmarbles.nl/api/auth"
	"github.com/Soesah/moms.lostmarbles.nl/api/models"
)

// GetRecipeList returns a list of recipes
func GetRecipeList(r *http.Request) ([]models.RecipeItem, error) {

	c := Controller{}
	err := c.LoadList(r)

	if err != nil {
		return c.List, err
	}

	return c.List, nil
}

// GetNewRecipes returns the latest two recipe
func GetNewRecipes(r *http.Request) ([]models.RecipeItem, error) {
	c := Controller{}
	err := c.LoadList(r)

	if err != nil {
		return c.List, err
	}

	list := c.List
	sort.SliceStable(list, func(i, j int) bool {
		return list[i].CreationDate.After(list[j].CreationDate)
	})

	return list[0:2], nil
}

// AddRecipe creates a recipe
func AddRecipe(recipe models.Recipe, r *http.Request) (models.Recipe, error) {
	c := Controller{}

	recipe, err := c.Store(recipe, r)

	if err != nil {
		return recipe, err
	}

	s, err := auth.GetSession(r)

	if err != nil {
		return recipe, err
	}

	err = NewChange(s.UserID, recipe.ID, "created", r)

	if err != nil {
		return recipe, err
	}

	return recipe, nil
}

// GetRecipe returns a recipe
func GetRecipe(ID int64, r *http.Request) (models.RecipeJSON, error) {
	var json models.RecipeJSON
	c := Controller{}
	recipe, err := c.Load(ID, r)

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
	json.Cook = json.GetCook()
	json.Image = json.GetImage()
	steps, err := json.GetPreparation()

	if err != nil {
		json.Steps = make([]models.Step, 0)
	}

	json.Steps = steps.Steps
	notes, err := json.GetNotes()

	if err != nil {
		json.Notes = make([]models.Note, 0)
	}

	json.Notes = notes

	return json, nil
}

// UpdateRecipe updates a recipe
func UpdateRecipe(recipe models.Recipe, r *http.Request) (models.Recipe, error) {
	c := Controller{}

	recipe, err := c.Store(recipe, r)

	if err != nil {
		return recipe, err
	}

	s, err := auth.GetSession(r)

	if err != nil {
		return recipe, err
	}

	err = NewChange(s.UserID, recipe.ID, "changed", r)

	if err != nil {
		return recipe, err
	}

	return recipe, nil
}

// DeleteRecipe deletes a recipe
func DeleteRecipe(ID int64, r *http.Request) error {
	c := Controller{}
	err := c.Delete(ID, r)

	if err != nil {
		return err
	}

	return nil
}
