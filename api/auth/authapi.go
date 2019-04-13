package auth

import (
	"net/http"
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

// LoginUser is used to login a user
func LoginUser(name string, r *http.Request) (models.Session, models.Auth, error) {
	ctx := appengine.NewContext(r)

	// options := datastore.TransactionOptions{
	// 	XG: true,
	// }

	var auth models.Auth
	var users []models.User

	q := datastore.NewQuery(api.MomsUserKind).Filter("Name =", name)

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
		session.UUID = sessionUUID.String()
		session.Expires = time.Now().Add(5 * time.Hour)

		// store level in auth, to see if further login is required later
		auth.Name = user.Name
		auth.Level = user.UserLevel

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

// LoginAdmin is used to login an admin
func LoginAdmin(password string, r *http.Request) error {

	return nil
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
