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

	users, err := c.Load(r)

	if err != nil {
		return users, err
	}

	return users, nil
}

// CreateUser creates a user
func CreateUser(user models.User, r *http.Request) (models.User, error) {
	c := Controller{}

	users, err := c.Load(r)

	if err != nil {
		return user, err
	}

	user.ID = c.GetNewID()

	updated := users
	updated = append(updated, user)

	err = c.Store(updated, r)

	if err != nil {
		return user, err
	}

	return user, nil
}

// UpdateUser updates a user
func UpdateUser(user models.User, r *http.Request) (models.User, error) {
	c := Controller{}

	users, err := c.Load(r)

	if err != nil {
		return user, err
	}

	var updated []models.User
	found := false
	for _, u := range users {
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

	return user, nil
}

// DeleteUser deletes a category
func DeleteUser(ID int64, r *http.Request) error {
	c := Controller{}

	users, err := c.Load(r)

	if err != nil {
		return err
	}

	var updated []models.User
	found := false
	for _, u := range users {
		if u.ID == ID {
			found = true
		} else {
			updated = append(updated, u)
		}
	}

	if !found {
		return errUserNotFound
	}

	err = c.Store(updated, r)

	if err != nil {
		return err
	}

	return nil
}
