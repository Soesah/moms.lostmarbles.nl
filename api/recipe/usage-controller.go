package recipe

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"github.com/Soesah/moms.lostmarbles.nl/api/storage"
)

var (
	errNoUsagesToSave = errors.New("No usage data to be saved")
)

// UsageController is used to store usage data on recipes
type UsageController struct {
	NewID int64
	Usage []models.Usage
}

// Load is used to load a recipe list
func (c *UsageController) Load(r *http.Request) error {
	var changelog []models.Usage

	data, err := storage.GetFile("usage", r)

	if err != nil {
		return err
	}

	err = json.Unmarshal(data, &changelog)

	if err != nil {
		return err
	}

	c.setList(changelog)

	return nil
}

// setList is used to start the controller
func (c *UsageController) setList(list []models.Usage) {
	c.Usage = list
	c.parseNewID()
}

// getNewID raises the internal ID and returns a new one
func (c *UsageController) getNewID() int64 {

	c.NewID = c.NewID + 1
	return c.NewID
}

// parseNewID reads the hours and sets newID
func (c *UsageController) parseNewID() {
	var newID int64 = 0

	for _, r := range c.Usage {
		if r.ID > newID {
			newID = r.ID
		}
	}

	c.NewID = newID
}

// Add adds a change
func (c *UsageController) Add(recipeID int64, userID int64) error {
	c.Usage = append(c.Usage, models.Usage{
		ID:       c.getNewID(),
		RecipeID: recipeID,
		Date:     time.Now(),
		UserID:   userID,
	})

	return nil
}

// Store is used to store a changelog
func (c *UsageController) Store(r *http.Request) error {

	if len(c.Usage) == 0 {
		return errNoChangesToSave
	}

	data, err := json.MarshalIndent(c.Usage, "", "  ")

	if err != nil {
		return err
	}

	err = storage.PutFile("usage", data, r)

	if err != nil {
		return err
	}

	return nil
}
