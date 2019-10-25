package recipe

import (
	"net/http"
	"sort"

	"github.com/Soesah/moms.lostmarbles.nl/api/models"
)

// GetLatestChange returns the latest change
func GetLatestChange(r *http.Request) (models.ChangeLog, error) {
	var change models.ChangeLog

	c := ChangeController{}
	err := c.Load(r)

	if err != nil {
		return change, err
	}

	sort.SliceStable(c.Changes, func(i, j int) bool {
		return c.Changes[i].Date.After(c.Changes[j].Date)
	})

	change = c.Changes[0]

	return change, nil
}

// GetRecipeChanges returns the latest changes for a recipe
func GetRecipeChanges(ID int64, r *http.Request) ([]models.ChangeLog, error) {
	var changes []models.ChangeLog

	c := ChangeController{}
	err := c.Load(r)

	if err != nil {
		return changes, err
	}

	for _, change := range c.Changes {
		if change.RecipeID == ID {
			changes = append(changes, change)
		}
	}

	return changes, nil
}
