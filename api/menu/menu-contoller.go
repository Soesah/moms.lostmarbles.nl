package menu

import (
	"encoding/json"
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api/menu/models"
	"github.com/Soesah/moms.lostmarbles.nl/api/storage"
)

var (
// errNoMenuListToSave = errors.New("No category menu to be saved")
)

// Controller is used to save and load MenuData
type Controller struct {
	Menus       []models.Menu
	Meals       []models.Meal
	Ingredients []models.Ingredient
}

// Load is used to load a recipe menu
func (c *Controller) Load(r *http.Request) error {
	var menuData models.MenuData

	data, err := storage.GetFile("menu", r)

	if err != nil {
		return err
	}

	err = json.Unmarshal(data, &menuData)

	if err != nil {
		return err
	}

	c.setData(menuData)

	return nil
}

// setData is used to start the controller
func (c *Controller) setData(data models.MenuData) {
	c.Menus = data.Menus
	c.Meals = data.Meals
	c.Ingredients = data.Ingredients
}

// GetNewMenuID raises the internal ID and returns a new one
func (c *Controller) GetNewMenuID() int64 {
	var newMenuID int64 = 0

	for _, r := range c.Menus {
		if r.ID > newMenuID {
			newMenuID = r.ID
		}
	}

	return newMenuID
}

// GetNewMealID raises the internal ID and returns a new one
func (c *Controller) GetNewMealID() int64 {
	var newMealID int64 = 0

	for _, r := range c.Meals {
		if r.ID > newMealID {
			newMealID = r.ID
		}
	}

	return newMealID
}

// GetNewIngredientID raises the internal ID and returns a new one
func (c *Controller) GetNewIngredientID() int64 {
	var newIngredientID int64 = 0

	for _, r := range c.Ingredients {
		if r.ID > newIngredientID {
			newIngredientID = r.ID
		}
	}

	return newIngredientID
}

// Store is used to store a category menu
func (c *Controller) Store(r *http.Request) error {

	menuData := models.MenuData{
		Menus:       c.Menus,
		Meals:       c.Meals,
		Ingredients: c.Ingredients,
	}

	data, err := json.MarshalIndent(menuData, "", "  ")

	if err != nil {
		return err
	}

	err = storage.PutFile("menu", data, r)

	if err != nil {
		return err
	}

	return nil
}
