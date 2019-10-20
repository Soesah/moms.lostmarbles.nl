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
	List  []models.User
}

// Load is used to load a recipe list
func (c *Controller) Load(r *http.Request) ([]models.User, error) {
	var users []models.User

	data, err := storage.GetFile("users", r)

	if err != nil {
		return users, err
	}

	err = json.Unmarshal(data, &users)

	if err != nil {
		return users, err
	}

	c.setList(users)

	return users, nil
}

// setList is used to start the controller
func (c *Controller) setList(list []models.User) {
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

// Store is used to store a user list
func (c *Controller) Store(users []models.User, r *http.Request) error {

	if len(users) == 0 {
		return errNoUserListToSave
	}

	data, err := json.MarshalIndent(users, "", "  ")

	if err != nil {
		return err
	}

	err = storage.PutFile("users", data, r)

	if err != nil {
		return err
	}

	return nil
}
