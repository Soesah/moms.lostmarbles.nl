package category

import (
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api"
	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

// GetCategoryList returns a list of categories
func GetCategoryList(r *http.Request) ([]models.Category, error) {
	var categories []models.Category
	ctx := appengine.NewContext(r)

	q := datastore.NewQuery(api.MomsCategoryKind)
	_, err := q.GetAll(ctx, &categories)
	if err != nil {
		return categories, err
	}

	return categories, nil
}

// GetCategory returns a category
func GetCategory(id int64, r *http.Request) (models.Category, error) {
	var category models.Category
	ctx := appengine.NewContext(r)
	key := api.CategoryKey(ctx, id)

	err := datastore.Get(ctx, key, &category)
	if err != nil {
		return category, err
	}

	return category, nil
}

// UpdateCategory updates a category
func UpdateCategory(category models.Category, r *http.Request) (models.Category, error) {
	ctx := appengine.NewContext(r)
	key := api.CategoryKey(ctx, category.ID)

	_, err := datastore.Put(ctx, key, &category)
	if err != nil {
		return category, err
	}

	return category, nil
}

// DeleteCategory deletes a category
func DeleteCategory(id int64, r *http.Request) error {
	ctx := appengine.NewContext(r)
	key := api.CategoryKey(ctx, id)

	err := datastore.Delete(ctx, key)
	if err != nil {
		return err
	}

	return nil
}
