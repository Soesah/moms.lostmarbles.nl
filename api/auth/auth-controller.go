package auth

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
}

// SetUsers is used to set the user list
func (c *Controller) SetUsers(users []models.User) {
	c.Data.Users = users
}

// StoreSessions is used to store a user list
func (c *Controller) StoreSessions(sessions []models.Session, r *http.Request) error {
	var updated models.AuthData

	updated.Sessions = sessions
	updated.Users = c.Data.Users

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
