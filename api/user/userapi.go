package user

import (
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api"
	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

// GetUserList returns a list of Users
func GetUserList(r *http.Request) ([]models.User, error) {
	var users []models.User
	ctx := appengine.NewContext(r)

	q := datastore.NewQuery(api.MomsUserKind)
	_, err := q.GetAll(ctx, &users)
	if err != nil {
		return users, err
	}

	return users, nil

}

// CreateUser creates a user
func CreateUser() {

}

// GetUser returns a user
func GetUser() {

}

// UpdateUser updates a user
func UpdateUser() {

}

// DeleteUser deletes a user
func DeleteUser() {

}
