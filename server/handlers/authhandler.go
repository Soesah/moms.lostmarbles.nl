package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/api/auth"
	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
	"github.com/go-chi/chi"
)

// GetAuth is used to login as user
func GetAuth(w http.ResponseWriter, r *http.Request) {
	session, err := auth.GetSession(r)

	if err != nil {
		httpext.AbortAPI(w, "No session found", http.StatusNotFound)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", models.Auth{
		Name:            session.UserName,
		Level:           session.UserLevel,
		AuthorizedLevel: session.AuthorizedLevel,
	})
}

// Login is used to login as user
func Login(w http.ResponseWriter, r *http.Request) {
	loginType := chi.URLParam(r, "type")
	decoder := json.NewDecoder(r.Body)

	var data models.LoginData
	err := decoder.Decode(&data)
	if err != nil {
		httpext.AbortAPI(w, "No name provided", http.StatusInternalServerError)
		return
	}

	var session models.Session
	var authentication models.Auth

	switch loginType {
	case "cook":
		session, authentication, err = auth.LoginCook(data.Name, r)
	default:
		session, authentication, err = auth.LoginChefOrAdmin(data.Password, r)
	}

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusForbidden)
		return
	}

	// set a cookie with the session UUID
	cookie := &http.Cookie{
		Name:       auth.CookieKey,
		Value:      session.UUID,
		Path:       "/",
		Expires:    session.Expires,
		RawExpires: session.Expires.Format(time.UnixDate),
		HttpOnly:   true,
		// Secure:     true,
	}

	http.SetCookie(w, cookie)

	httpext.SuccessDataAPI(w, "Ok", authentication)
}

// LoginAdmin is used to login as admin
func LoginAdmin(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "Ok")
}

// Logout is used to logout
func Logout(w http.ResponseWriter, r *http.Request) {
	err := auth.Logout(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// unset the cookie
	cookie := &http.Cookie{
		Name:       auth.CookieKey,
		Value:      "",
		Path:       "/",
		Expires:    time.Now(),
		RawExpires: time.Now().Format(time.UnixDate),
		HttpOnly:   true,
		// Secure:     true,
	}

	http.SetCookie(w, cookie)

	httpext.SuccessAPI(w, "Ok")
}

// ClearStaleSessions is used to clear stale sessions
func ClearStaleSessions(w http.ResponseWriter, r *http.Request) {
	err := auth.ClearStaleSessions(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessAPI(w, "Ok")
}
