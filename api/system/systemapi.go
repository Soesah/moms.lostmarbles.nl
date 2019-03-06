package system

import (
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api"
	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

// ImportRecipes is used to import recipes
func ImportRecipes(r *http.Request, recipes []models.Recipe) error {
	var keys []*datastore.Key
	ctx := appengine.NewContext(r)

	for _, recipe := range recipes {
		keys = append(keys, api.RecipeKey(ctx, recipe.ID, recipe.CategoryID))
	}

	_, err := datastore.PutMulti(ctx, keys, &recipes)

	if err != nil {
		return err
	}

	return nil
}

// ImportCategories is used to import categories
func ImportCategories(r *http.Request, categories []models.Category) error {
	var keys []*datastore.Key
	ctx := appengine.NewContext(r)

	for _, category := range categories {
		keys = append(keys, api.CategoryKey(ctx, category.ID))
	}

	_, err := datastore.PutMulti(ctx, keys, &categories)

	if err != nil {
		return err
	}

	return nil
}

// ImportUsers is used to import users
func ImportUsers(r *http.Request, users []models.User) error {
	var keys []*datastore.Key
	ctx := appengine.NewContext(r)

	for _, user := range users {
		keys = append(keys, api.UserKey(ctx, user.ID))
	}

	_, err := datastore.PutMulti(ctx, keys, &users)

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
