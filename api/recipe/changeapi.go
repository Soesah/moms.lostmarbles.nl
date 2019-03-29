package recipe

import (
	"net/http"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/api"
	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

// GetLatestChanges returns the latest changes
func GetLatestChanges(r *http.Request) ([]models.ChangeLog, error) {
	ctx := appengine.NewContext(r)
	var changes []models.ChangeLog

	threeMonthsAgo := time.Now().Add(-24 * 30 * 6 * time.Hour)

	q := datastore.NewQuery(api.ChangeLogKind).Order("-Date").Filter("Date >", threeMonthsAgo)

	_, err := q.GetAll(ctx, &changes)

	if err != nil {
		return changes, err
	}

	return changes, nil
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
