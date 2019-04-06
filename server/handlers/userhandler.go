package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"github.com/Soesah/moms.lostmarbles.nl/api/user"
	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
)

// GetUserList returns a list of Users
func GetUserList(w http.ResponseWriter, r *http.Request) {

	users, err := user.GetUserList(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", users)
}

// CreateUser creates a user
func CreateUser(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var update models.User
	err := decoder.Decode(&update)
	u, err := user.UpdateUser(update, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", u)
}

// GetUser returns a user
func GetUser(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// UpdateUser updates a user
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var update models.User
	err := decoder.Decode(&update)
	u, err := user.UpdateUser(update, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", u)
}

// DeleteUser deletes a user
func DeleteUser(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}
