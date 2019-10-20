package category

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"github.com/Soesah/moms.lostmarbles.nl/api/storage"
)

var (
	errNoCategoryListToSave = errors.New("No category list to be saved")
)

// Controller is used to save and load Categorys
type Controller struct {
	NewID int64
	List  []models.Category
}

// Load is used to load a recipe list
func (c *Controller) Load(r *http.Request) ([]models.Category, error) {
	var categories []models.Category

	data, err := storage.GetFile("categories", r)

	if err != nil {
		return categories, err
	}

	err = json.Unmarshal(data, &categories)

	if err != nil {
		return categories, err
	}

	c.setList(categories)

	return categories, nil
}

// setList is used to start the controller
func (c *Controller) setList(list []models.Category) {
	c.List = list
	c.parseNewID()
}

// GetNewID raises the internal ID and returns a new one
func (c *Controller) GetNewID() int64 {

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

// Store is used to store a category list
func (c *Controller) Store(categories []models.Category, r *http.Request) error {

	if len(categories) == 0 {
		return errNoCategoryListToSave
	}

	data, err := json.MarshalIndent(categories, "", "  ")

	if err != nil {
		return err
	}

	err = storage.PutFile("categories", data, r)

	if err != nil {
		return err
	}

	return nil
}
