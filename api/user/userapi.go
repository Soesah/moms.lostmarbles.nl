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
func CreateUser(user models.User, r *http.Request) (models.User, error) {
	ctx := appengine.NewContext(r)
	key := api.UserKey(ctx, user.ID)

	_, err := datastore.Put(ctx, key, &user)

	if err != nil {
		return user, err
	}

	return user, nil
}

// GetUser returns a user
func GetUser() {

}

// UpdateUser updates a user
func UpdateUser(user models.User, r *http.Request) (models.User, error) {
	ctx := appengine.NewContext(r)
	key := api.UserKey(ctx, user.ID)

	_, err := datastore.Put(ctx, key, &user)

	if err != nil {
		return user, err
	}

	return user, nil
}

// DeleteUser deletes a user
func DeleteUser() {

}
