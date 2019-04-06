package recipe

import (
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api"
	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

// GetLatestChange returns the latest change
func GetLatestChange(r *http.Request) (models.ChangeLog, error) {
	ctx := appengine.NewContext(r)
	var changes []models.ChangeLog
	var change models.ChangeLog

	q := datastore.NewQuery(api.ChangeLogKind).Order("-Date")

	_, err := q.GetAll(ctx, &changes)

	if err != nil {
		return change, err
	}

	change = changes[0]

	return change, nil
}

// GetRecipeChanges returns the latest changes for a recipe
func GetRecipeChanges(id int64, r *http.Request) ([]models.ChangeLog, error) {
	ctx := appengine.NewContext(r)
	key := api.RecipeChangeKey(ctx, id)
	var changes []models.ChangeLog

	q := datastore.NewQuery(api.ChangeLogKind).Ancestor(key).Order("Date")

	_, err := q.GetAll(ctx, &changes)

	if err != nil {
		return changes, err
	}

	return changes, nil
}
