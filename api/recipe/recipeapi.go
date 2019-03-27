package recipe

import (
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

	q := datastore.NewQuery(api.RecipeKind)
	_, err := q.GetAll(ctx, &recipes)
	if err != nil {
		return items, err
	}

	threemonths, _ := time.ParseDuration("2160h")

	for _, recipe := range recipes {
		items = append(items, models.RecipeItem{
			ID:         recipe.ID,
			CategoryID: recipe.CategoryID,
			Slug:       recipe.Slug,
			Name:       recipe.Name,
			IsNew:      recipe.CreationDate.After(time.Now().Add(-threemonths)),
		})
	}

	return items, nil
}

// CreateRecipe creates a recipe
func CreateRecipe() {

}

// GetRecipe returns a recipe
func GetRecipe(ID int64, categoryID int64, r *http.Request) (models.Recipe, error) {
	var recipe models.Recipe
	ctx := appengine.NewContext(r)
	key := api.RecipeKey(ctx, ID, categoryID)

	err := datastore.Get(ctx, key, &recipe)

	if err != nil {
		return recipe, err
	}

	return recipe, nil
}

// UpdateRecipe updates a recipe
func UpdateRecipe() {
	// changelog
}

// DeleteRecipe deletes a recipe
func DeleteRecipe() {

}
