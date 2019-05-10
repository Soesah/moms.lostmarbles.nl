package auth

import (
	"net/http"
	"strings"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/api"
	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	uuid "github.com/satori/go.uuid"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

const (
	// CookieKey is used for the cookie
	CookieKey = "sessionKey"
)

// LoginCook is used to login a user
func LoginCook(name string, r *http.Request) (models.Session, models.Auth, error) {
	ctx := appengine.NewContext(r)

	// options := datastore.TransactionOptions{
	// 	XG: true,
	// }

	auth := models.Auth{
		Name:            "",
		Level:           models.GuestLevel,
		AuthorizedLevel: models.GuestLevel,
	}

	var users []models.User

	q := datastore.NewQuery(api.MomsUserKind).Filter("Search =", strings.ToLower(name))

	keys, err := q.GetAll(ctx, &users)

	var session models.Session

	if err != nil {
		return session, auth, err
	}

	if len(users) == 1 {
		key := keys[0]
		user := users[0]
		sessionUUID := uuid.Must(uuid.NewV4())

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
		user.LastLoginDate = time.Now()
		_, err := datastore.Put(ctx, key, &user)

		if err != nil {
			return session, auth, err
		}

		// store the session
		skey := api.SessionKey(ctx, session.UUID)
		_, err = datastore.Put(ctx, skey, &session)

		if err != nil {
			return session, auth, err
		}

	}

	return session, auth, nil
}

// GetSession returns a session from memcache
func GetSession(r *http.Request) (models.Session, error) {
	ctx := appengine.NewContext(r)

	var session models.Session

	Cookie, err := r.Cookie(CookieKey)
	if err != nil {
		return session, err
	}

	session.UUID = Cookie.Value

	err = datastore.Get(ctx, api.SessionKey(ctx, Cookie.Value), &session)

	if err != nil {
		return session, err
	}

	return session, nil
}

// LoginChefOrAdmin is used to login an admin
func LoginChefOrAdmin(password string, r *http.Request) (models.Session, models.Auth, error) {
	ctx := appengine.NewContext(r)

	var auth models.Auth
	var users []models.User

	session, err := GetSession(r)

	if err != nil {
		return session, auth, err
	}

	q := datastore.NewQuery(api.MomsUserKind).Filter("Password =", password)

	_, err = q.GetAll(ctx, &users)

	if err != nil {
		return session, auth, err
	}

	if len(users) == 1 {
		user := users[0]

		if session.UserID == user.ID {

			// upgrade auth with full authorized level
			session.AuthorizedLevel = user.UserLevel

			auth.Name = session.UserName
			auth.Level = session.UserLevel
			auth.AuthorizedLevel = session.AuthorizedLevel

			// store the session
			skey := api.SessionKey(ctx, session.UUID)
			_, err = datastore.Put(ctx, skey, &session)
		}

	}

	return session, auth, nil
}

// Logout is used to logout
func Logout(r *http.Request) error {
	ctx := appengine.NewContext(r)

	var session models.Session

	Cookie, err := r.Cookie(CookieKey)
	if err != nil {
		return err
	}

	session.UUID = Cookie.Value

	err = datastore.Delete(ctx, api.SessionKey(ctx, Cookie.Value))

	return nil
}

// ClearStaleSessions is used to clear stale sessions
func ClearStaleSessions(r *http.Request) error {
	ctx := appengine.NewContext(r)
	var sessions []models.Session

	q := datastore.NewQuery(api.MomsSessionKind).Filter("Expires <", time.Now())

	keys, err := q.GetAll(ctx, &sessions)

	if err != nil {
		return err
	}

	err = datastore.DeleteMulti(ctx, keys)

	if err != nil {
		return err
	}

	return nil
}
