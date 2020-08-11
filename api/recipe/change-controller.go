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
	errNoChangesToSave = errors.New("No changes to be saved")
)

// ChangeController is used to save and load changelog
type ChangeController struct {
	NewID   int64
	Changes []models.ChangeLog
}

// Load is used to load a recipe list
func (c *ChangeController) Load(r *http.Request) error {
	var changelog []models.ChangeLog

	data, err := storage.GetFile("changelog", r)

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
func (c *ChangeController) setList(list []models.ChangeLog) {
	c.Changes = list
	c.parseNewID()
}

// getNewID raises the internal ID and returns a new one
func (c *ChangeController) getNewID() int64 {

	c.NewID = c.NewID + 1
	return c.NewID
}

// parseNewID reads the hours and sets newID
func (c *ChangeController) parseNewID() {
	var newID int64 = 0

	for _, r := range c.Changes {
		if r.ID > newID {
			newID = r.ID
		}
	}

	c.NewID = newID
}

// Add adds a change
func (c *ChangeController) Add(userID int64, recipeID int64, changeType string) error {
	c.Changes = append(c.Changes, models.ChangeLog{
		ID:       c.getNewID(),
		UserID:   userID,
		RecipeID: recipeID,
		Type:     changeType,
		Date:     time.Now(),
	})

	return nil
}

// Store is used to store a changelog
func (c *ChangeController) Store(r *http.Request) error {

	if len(c.Changes) == 0 {
		return errNoChangesToSave
	}

	data, err := json.MarshalIndent(c.Changes, "", "  ")

	if err != nil {
		return err
	}

	err = storage.PutFile("changelog", data, r)

	if err != nil {
		return err
	}

	return nil
}
