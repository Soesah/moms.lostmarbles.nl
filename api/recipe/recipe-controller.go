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

// Init is used to start the controller
func (c *Controller) Init(r *http.Request) {
	c.LoadList(r)
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

	for _, r := range c.List {

		ingredients, err := recipe.GetIngredients()

		if err != nil {
			return err
		}

		if r.ID == recipe.ID {
			item := models.RecipeItem{
				ID:           recipe.ID,
				CategoryID:   recipe.CategoryID,
				CreationDate: recipe.CreationDate,
				Name:         recipe.Name,
				Slug:         recipe.Slug,
				Ingredients:  ingredients,
			}
			updated = append(updated, item)
		} else {
			updated = append(updated, r)
		}
	}

	c.List = updated
	err := c.StoreList(r)

	if err != nil {
		return err
	}

	return nil
}

// StoreList is used to store a recipe list
func (c *Controller) StoreList(r *http.Request) error {

	if len(c.List) == 0 {
		return errNoRecipeListToSave
	}

	data, err := json.MarshalIndent(c.List, "", "  ")

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
	path := strings.Join([]string{"recipe_", id}, "")

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

// Store is used to store recipes
func (c *Controller) Store(recipe models.Recipe, r *http.Request) error {

	data, err := json.MarshalIndent(recipe, "", "  ")

	if err != nil {
		return err
	}

	id := strconv.Itoa(int(recipe.ID))
	path := strings.Join([]string{"recipe_", id}, "")

	err = storage.PutFile(path, data, r)

	if err != nil {
		return err
	}

	err = c.updateListItem(recipe, r)

	if err != nil {
		return err
	}

	return nil
}