package user

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"github.com/Soesah/moms.lostmarbles.nl/api/storage"
)

var (
	errNoUserListToSave = errors.New("No user list to be saved")
)

// Controller is used to save and load users
type Controller struct {
	NewID int64
	Data  models.AuthData
}

// Load is used to load a recipe list
func (c *Controller) Load(r *http.Request) (models.AuthData, error) {
	var authData models.AuthData

	data, err := storage.GetFile("users", r)

	if err != nil {
		return authData, err
	}

	err = json.Unmarshal(data, &authData)

	if err != nil {
		return authData, err
	}

	c.setData(authData)

	return authData, nil
}

// setData is used to start the controller
func (c *Controller) setData(data models.AuthData) {
	c.Data = data
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

	for _, r := range c.Data.Users {
		if r.ID > newID {
			newID = r.ID
		}
	}

	c.NewID = newID
}

// StoreUsers is used to store a user list
func (c *Controller) StoreUsers(users []models.User, r *http.Request) error {
	var updated models.AuthData

	updated.Sessions = c.Data.Sessions
	updated.Users = users

	return c.Store(updated, r)
}

// Store is used to store a user list
func (c *Controller) Store(authData models.AuthData, r *http.Request) error {

	if len(authData.Users) == 0 {
		return errNoUserListToSave
	}

	data, err := json.MarshalIndent(authData, "", "  ")

	if err != nil {
		return err
	}

	err = storage.PutFile("users", data, r)

	if err != nil {
		return err
	}

	return nil
}
