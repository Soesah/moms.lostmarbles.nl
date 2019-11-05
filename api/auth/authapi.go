package auth

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"github.com/google/uuid"
)

const (
	// CookieKey is used for the cookie
	CookieKey = "sessionKey"
)

var (
	errSessionNotFound = errors.New("Session not found")
	errTooManyUsers    = errors.New("Too many users")
)

// LoginCook is used to login a user
func LoginCook(name string, r *http.Request) (models.Session, models.Auth, error) {

	var session models.Session
	auth := models.Auth{
		Name:            "",
		Level:           models.CookLevel,
		AuthorizedLevel: models.CookLevel,
	}

	c := Controller{}

	data, err := c.Load(r)

	if err != nil {
		return session, auth, err
	}

	var users []models.User
	for _, u := range data.Users {
		if u.Search() == strings.ToLower(name) {
			users = append(users, u)
		}
	}

	if len(users) == 1 {
		user := users[0]
		sessionUUID, _ := uuid.NewUUID()

		session.UserID = user.ID
		session.UserName = user.Name
		session.UserLevel = user.UserLevel
		session.AuthorizedLevel = models.CookLevel
		session.UUID = sessionUUID.String()
		session.Expires = time.Now().Add(5 * time.Hour)

		// store level in auth, to see if further login is required later
		auth.Name = user.Name
		auth.Level = user.UserLevel
		// start as a cook
		auth.AuthorizedLevel = session.AuthorizedLevel

		// update the user
		var updated []models.User
		for _, u := range c.Data.Users {
			if u.ID == user.ID {
				user.LastLoginDate = time.Now()
				updated = append(updated, user)
			} else {
				updated = append(updated, u)
			}
		}
		c.SetUsers(updated)

		// add the session
		sessions := c.Data.Sessions
		sessions = append(sessions, session)

		err = c.StoreSessions(sessions, r)

		if err != nil {
			return session, auth, err
		}

	} else {
		return session, auth, errTooManyUsers
	}

	return session, auth, nil
}

// GetSession returns a session from memcache
func GetSession(r *http.Request) (models.Session, error) {

	var session models.Session

	Cookie, err := r.Cookie(CookieKey)

	if err != nil {
		return session, err
	}

	c := Controller{}
	data, err := c.Load(r)

	found := false
	session.UUID = Cookie.Value
	for _, s := range data.Sessions {
		if s.UUID == session.UUID {
			session = s
			found = true
		}
	}

	if !found {
		return session, errSessionNotFound
	}

	return session, nil
}

// LoginChefOrAdmin is used to login an admin
func LoginChefOrAdmin(password string, r *http.Request) (models.Session, models.Auth, error) {

	var auth models.Auth
	var users []models.User

	session, err := GetSession(r)

	if err != nil {
		return session, auth, err
	}

	c := Controller{}
	data, err := c.Load(r)

	if err != nil {
		return session, auth, err
	}

	for _, u := range data.Users {
		if u.Password == password {
			users = append(users, u)
		}
	}

	if len(users) == 1 {
		user := users[0]

		if session.UserID == user.ID {

			// upgrade auth with full authorized level
			session.AuthorizedLevel = user.UserLevel
			var updated []models.Session
			for _, s := range data.Sessions {
				if s.UUID == session.UUID {
					updated = append(updated, session)
				} else {
					updated = append(updated, s)
				}
			}

			auth.Name = session.UserName
			auth.Level = session.UserLevel
			auth.AuthorizedLevel = session.AuthorizedLevel

			// store the session
			err = c.StoreSessions(updated, r)

			if err != nil {
				return session, auth, err
			}
		}
	} else {
		return session, auth, errTooManyUsers
	}

	return session, auth, nil
}

// Logout is used to logout
func Logout(r *http.Request) error {

	var session models.Session

	Cookie, err := r.Cookie(CookieKey)
	if err != nil {
		return err
	}

	c := Controller{}
	data, err := c.Load(r)

	if err != nil {
		return err
	}

	session.UUID = Cookie.Value

	var updated []models.Session
	for _, s := range data.Sessions {
		if s.UUID == session.UUID {
		} else {
			updated = append(updated, s)
		}
	}

	err = c.StoreSessions(updated, r)

	if err != nil {
		return err
	}

	return nil
}

// ClearStaleSessions is used to clear stale sessions
func ClearStaleSessions(r *http.Request) error {

	c := Controller{}
	data, err := c.Load(r)

	if err != nil {
		return err
	}

	var updated []models.Session
	for _, s := range data.Sessions {
		// keep sessions with an expiry time after now
		if s.Expires.After(time.Now()) {
			updated = append(updated, s)
		}
	}

	err = c.StoreSessions(updated, r)

	if err != nil {
		return err
	}

	return nil
}
