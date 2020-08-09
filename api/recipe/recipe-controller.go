package recipe

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"

	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"github.com/Soesah/moms.lostmarbles.nl/api/storage"
)

var (
	errNoRecipeListToSave = errors.New("No recipe list to be saved")
)

// Controller is used to save and load recipes
type Controller struct {
	NewID   int64
	List    []models.RecipeItem
	Recipes []models.Recipe
}

// LoadList is used to load a recipe list
func (c *Controller) LoadList(r *http.Request) error {
	var recipes []models.RecipeItem

	data, err := storage.GetFile("recipes", r)

	if err != nil {
		return err
	}

	err = json.Unmarshal(data, &recipes)

	if err != nil {
		return err
	}

	c.setList(recipes)

	return nil
}

// setList is used to start the controller
func (c *Controller) setList(list []models.RecipeItem) {
	c.List = list
	c.parseNewID()
}

// getNewID raises the internal ID and returns a new one
func (c *Controller) getNewID() int64 {

	c.NewID = c.NewID + 1
	return c.NewID
}

// parseNewID reads the hours and sets newID
func (c *Controller) parseNewID() {
	var newID int64 = 0

	for _, r := range c.List {
		if r.ID > newID {
			newID = r.ID
		}
	}

	c.NewID = newID
}

// updateListItem is used to update the recipe list when a recipe has been saved
func (c *Controller) updateListItem(recipe models.Recipe, r *http.Request) error {
	var updated []models.RecipeItem
	found := false
	for _, re := range c.List {

		ingredients, err := recipe.GetIngredients()

		if err != nil {
			return err
		}
		steps, err := recipe.GetSteps()

		if err != nil {
			return err
		}
		cook, err := recipe.GetCook()

		if err != nil {
			return err
		}

		if re.ID == recipe.ID {
			item := models.RecipeItem{
				ID:           recipe.ID,
				CategoryID:   recipe.CategoryID,
				CreationDate: recipe.CreationDate,
				Name:         recipe.Name,
				Cook:         cook,
				Slug:         recipe.Slug,
				Ingredients:  ingredients,
				Steps:        steps,
			}
			found = true
			updated = append(updated, item)
		} else {
			updated = append(updated, re)
		}
	}

	if !found {
		ingredients, err := recipe.GetIngredients()

		if err != nil {
			return err
		}
		steps, err := recipe.GetSteps()

		if err != nil {
			return err
		}
		cook, err := recipe.GetCook()

		if err != nil {
			return err
		}

		updated = append(updated, models.RecipeItem{
			ID:           recipe.ID,
			CategoryID:   recipe.CategoryID,
			CreationDate: recipe.CreationDate,
			Name:         recipe.Name,
			Cook:         cook,
			Slug:         recipe.Slug,
			Ingredients:  ingredients,
			Steps:        steps,
		})
	}

	c.List = updated
	err := c.StoreList(updated, r)

	if err != nil {
		return err
	}

	return nil
}

// StoreList is used to store a recipe list
func (c *Controller) StoreList(recipes []models.RecipeItem, r *http.Request) error {

	if len(c.List) == 0 {
		return errNoRecipeListToSave
	}

	data, err := json.MarshalIndent(recipes, "", "  ")

	if err != nil {
		return err
	}

	err = storage.PutFile("recipes", data, r)

	if err != nil {
		return err
	}

	return nil
}

// Load is used to load recipes
func (c *Controller) Load(ID int64, r *http.Request) (models.Recipe, error) {
	var recipe models.Recipe

	id := strconv.Itoa(int(ID))
	path := strings.Join([]string{"recipes/recipe_", id}, "")

	data, err := storage.GetFile(path, r)

	if err != nil {
		return recipe, err
	}

	err = json.Unmarshal(data, &recipe)

	if err != nil {
		return recipe, err
	}

	return recipe, nil
}

// Delete is used to delete recipes
func (c *Controller) Delete(ID int64, r *http.Request) error {
	err := c.LoadList(r)

	if err != nil {
		return err
	}

	id := strconv.Itoa(int(ID))
	path := strings.Join([]string{"recipes/recipe_", id}, "")
	err = storage.RemoveFile(path, r)

	if err != nil {
		return err
	}

	var updated []models.RecipeItem
	for _, r := range c.List {
		if r.ID != ID {
			updated = append(updated, r)
		}
	}

	err = c.StoreList(updated, r)

	if err != nil {
		return err
	}

	return nil
}

// Store is used to store recipes
func (c *Controller) Store(recipe models.Recipe, r *http.Request) (models.Recipe, error) {

	err := c.LoadList(r)

	if err != nil {
		return recipe, err
	}

	if recipe.ID == 0 {
		recipe.ID = c.getNewID()
	}

	data, err := json.MarshalIndent(recipe, "", "  ")

	if err != nil {
		return recipe, err
	}

	id := strconv.Itoa(int(recipe.ID))
	path := strings.Join([]string{"recipes/recipe_", id}, "")

	err = storage.PutFile(path, data, r)

	if err != nil {
		return recipe, err
	}

	err = c.updateListItem(recipe, r)

	if err != nil {
		return recipe, err
	}

	return recipe, nil
}
