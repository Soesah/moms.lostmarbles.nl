package user

import (
	"errors"
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api/models"
)

var (
	errUserNotFound = errors.New("User not found")
)

// GetUserList returns a list of Users
func GetUserList(r *http.Request) ([]models.User, error) {
	c := Controller{}

	data, err := c.Load(r)

	if err != nil {
		return data.Users, err
	}

	return data.Users, nil
}

// CreateUser creates a user
func CreateUser(user models.User, r *http.Request) (models.User, error) {
	c := Controller{}

	data, err := c.Load(r)

	if err != nil {
		return user, err
	}

	user.ID = c.GetNewID()

	updated := data.Users
	updated = append(updated, user)

	err = c.StoreUsers(updated, r)

	if err != nil {
		return user, err
	}

	return user, nil
}

// UpdateUser updates a user
func UpdateUser(user models.User, r *http.Request) (models.User, error) {
	c := Controller{}

	data, err := c.Load(r)

	if err != nil {
		return user, err
	}

	var updated []models.User
	found := false
	for _, u := range data.Users {
		if u.ID == user.ID {
			updated = append(updated, user)
			found = true
		} else {
			updated = append(updated, u)
		}
	}

	if !found {
		return user, errUserNotFound
	}

	err = c.StoreUsers(updated, r)

	if err != nil {
		return user, err
	}

	return user, nil
}

// DeleteUser deletes a category
func DeleteUser(ID int64, r *http.Request) error {
	c := Controller{}

	data, err := c.Load(r)

	if err != nil {
		return err
	}

	var updated []models.User
	found := false
	for _, u := range data.Users {
		if u.ID == ID {
			found = true
		} else {
			updated = append(updated, u)
		}
	}

	if !found {
		return errUserNotFound
	}

	err = c.StoreUsers(updated, r)

	if err != nil {
		return err
	}

	return nil
}
