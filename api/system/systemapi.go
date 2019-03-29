package system

import (
	"errors"
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api"
	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

// ImportRecipes is used to import recipes
func ImportRecipes(recipes []models.Recipe, r *http.Request) error {
	var keys []*datastore.Key
	var ingredientKeys []*datastore.Key
	var ingredients []models.Ingredient
	ctx := appengine.NewContext(r)

	for _, recipe := range recipes {
		keys = append(keys, api.RecipeKey(ctx, recipe.ID, recipe.CategoryID))
		recipeIngredients, err := recipe.GetIngredients()
		if err != nil {
			return errors.New("Error parsing ingredients for recipe " + recipe.Name + ":" + err.Error())
		}
		for _, ingredient := range recipeIngredients {
			ingredientKeys = append(ingredientKeys, api.IngredientKey(ctx, ingredient.Name, recipe.ID, recipe.CategoryID))
			ingredients = append(ingredients, ingredient)
		}
	}

	_, err := datastore.PutMulti(ctx, keys, recipes)
	if err != nil {
		return errors.New("Error saving recipes " + err.Error())
	}

	_, err = datastore.PutMulti(ctx, ingredientKeys, ingredients)
	if err != nil {
		return errors.New("Error saving ingredients " + err.Error())
	}

	return nil
}

// ImportCategories is used to import categories
func ImportCategories(categories []models.Category, r *http.Request) error {
	var keys []*datastore.Key
	ctx := appengine.NewContext(r)

	for _, category := range categories {
		keys = append(keys, api.CategoryKey(ctx, category.ID))
	}

	_, err := datastore.PutMulti(ctx, keys, categories)

	if err != nil {
		return err
	}

	return nil
}

// ImportUsers is used to import users
func ImportUsers(users []models.User, r *http.Request) error {
	var keys []*datastore.Key
	ctx := appengine.NewContext(r)

	for _, user := range users {
		keys = append(keys, api.UserKey(ctx, user.ID))
	}

	_, err := datastore.PutMulti(ctx, keys, users)

	if err != nil {
		return err
	}

	return nil
}

// ImportChangelog is used to import changelog
func ImportChangelog(changelogs []models.ChangeLog, r *http.Request) error {
	var keys []*datastore.Key
	ctx := appengine.NewContext(r)

	for _, changelog := range changelogs {
		keys = append(keys, api.ChangeLogKey(ctx, changelog.ID, changelog.RecipeID))
	}

	_, err := datastore.PutMulti(ctx, keys, changelogs)

	if err != nil {
		return err
	}

	return nil
}

// Export is used for exporting all data
type Export struct {
	Users      []models.User     `json:"users"`
	Categories []models.Category `json:"categories"`
	Recipes    []models.Recipe   `json:"recipes"`
}

// ExportData is used to export data
func ExportData() (Export, error) {
	var export Export

	return export, nil
}

// ClearAll clears all
func ClearAll(r *http.Request) error {

	ctx := appengine.NewContext(r)

	var recipes []models.Recipe
	var changes []models.ChangeLog
	var categories []models.Category
	var ingredients []models.Ingredient
	var users []models.User

	q := datastore.NewQuery(api.RecipeKind)
	keys, err := q.GetAll(ctx, &recipes)
	if err != nil {
		return err
	}
	err = datastore.DeleteMulti(ctx, keys)

	q = datastore.NewQuery(api.ChangeLogKind)
	keys, err = q.GetAll(ctx, &changes)
	if err != nil {
		return err
	}
	err = datastore.DeleteMulti(ctx, keys)
	if err != nil {
		return err
	}

	q = datastore.NewQuery(api.MomsCategoryKind)
	keys, err = q.GetAll(ctx, &categories)
	if err != nil {
		return err
	}
	err = datastore.DeleteMulti(ctx, keys)
	if err != nil {
		return err
	}

	q = datastore.NewQuery(api.MomsUserKind)
	keys, err = q.GetAll(ctx, &users)
	if err != nil {
		return err
	}
	err = datastore.DeleteMulti(ctx, keys)
	if err != nil {
		return err
	}

	q = datastore.NewQuery(api.IngredientKind)
	keys, err = q.GetAll(ctx, &ingredients)
	if err != nil {
		return err
	}
	err = datastore.DeleteMulti(ctx, keys)

	if err != nil {
		return err
	}

	return nil
}
