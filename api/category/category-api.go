package category

import (
	"errors"
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api/models"
)

var (
	errCategoryNotFound = errors.New("Category not found")
)

// GetCategoryList returns a list of categories
func GetCategoryList(r *http.Request) ([]models.Category, error) {
	c := Controller{}

	categories, err := c.Load(r)

	if err != nil {
		return categories, err
	}

	return categories, nil
}

// GetCategory returns a category
func GetCategory(ID int64, r *http.Request) (models.Category, error) {
	var category models.Category
	c := Controller{}

	categories, err := c.Load(r)

	if err != nil {
		return category, err
	}

	for _, cat := range categories {
		if cat.ID == ID {
			category = cat
		}
	}

	if category.NameSingular == "" {
		return category, errCategoryNotFound
	}

	return category, nil
}

// UpdateCategory updates a category
func UpdateCategory(category models.Category, r *http.Request) (models.Category, error) {
	c := Controller{}

	categories, err := c.Load(r)

	if err != nil {
		return category, err
	}

	var updated []models.Category
	found := false
	for _, u := range categories {
		if u.ID == category.ID {
			updated = append(updated, category)
			found = true
		} else {
			updated = append(updated, u)
		}
	}

	if !found {
		return category, errCategoryNotFound
	}

	err = c.Store(updated, r)

	if err != nil {
		return category, err
	}

	return category, nil
}

// DeleteCategory deletes a category
func DeleteCategory(ID int64, r *http.Request) error {
	c := Controller{}

	categories, err := c.Load(r)

	if err != nil {
		return err
	}

	var updated []models.Category
	found := false
	for _, u := range categories {
		if u.ID == ID {
			found = true
		} else {
			updated = append(updated, u)
		}
	}

	if !found {
		return errCategoryNotFound
	}

	err = c.Store(updated, r)

	if err != nil {
		return err
	}

	return nil
}
