package handlers

import (
	"net/http"

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

	httpext.SuccessAPI(w, "ok")
}

// GetUser returns a user
func GetUser(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// UpdateUser updates a user
func UpdateUser(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// DeleteUser deletes a user
func DeleteUser(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}
