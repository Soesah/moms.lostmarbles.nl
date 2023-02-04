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
	NewMenuID       int64
	NewMealID       int64
	NewIngredientID int64
	Menus           []models.Menu
	Meals           []models.Meal
	Ingredients     []models.Ingredient
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
	c.parseNewMenuID()
	c.Meals = data.Meals
	c.parseNewMealID()
	c.Ingredients = data.Ingredients
	c.parseNewIngredientID()
}

// GetNewMenuID raises the internal ID and returns a new one
func (c *Controller) GetNewMenuID() int64 {

	c.NewMenuID = c.NewMenuID + 1
	return c.NewMenuID
}

// parseNewMenuID reads the hours and sets newID
func (c *Controller) parseNewMenuID() {
	var newMenuID int64 = 0

	for _, r := range c.Menus {
		if r.ID > newMenuID {
			newMenuID = r.ID
		}
	}

	c.NewMenuID = newMenuID
}

// GetNewMealID raises the internal ID and returns a new one
func (c *Controller) GetNewMealID() int64 {

	c.NewMealID = c.NewMealID + 1
	return c.NewMealID
}

// parseNewMealID reads the hours and sets newID
func (c *Controller) parseNewMealID() {
	var newMealID int64 = 0

	for _, r := range c.Meals {
		if r.ID > newMealID {
			newMealID = r.ID
		}
	}

	c.NewMealID = newMealID
}

// GetNewIngredientID raises the internal ID and returns a new one
func (c *Controller) GetNewIngredientID() int64 {

	c.NewIngredientID = c.NewIngredientID + 1
	return c.NewIngredientID
}

// parseNewIngredientID reads the hours and sets newID
func (c *Controller) parseNewIngredientID() {
	var newIngredientID int64 = 0

	for _, r := range c.Ingredients {
		if r.ID > newIngredientID {
			newIngredientID = r.ID
		}
	}

	c.NewIngredientID = newIngredientID
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
