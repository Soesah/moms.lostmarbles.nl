package models

import "time"

// AuthData is the complete set of sessions and users
type AuthData struct {
	Sessions []Session `json:"sessions"`
	Users    []User    `json:"users"`
}

// Auth is some authentication data which is exposed to the front-end
type Auth struct {
	Name            string `json:"name"`
	Level           int64  `json:"level"`
	AuthorizedLevel int64  `json:"authorizedLevel"`
}

// LoginData is used when logging in
type LoginData struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

// Session is authentication data stored in the backend
type Session struct {
	UUID            string
	UserName        string
	UserID          int64
	UserLevel       int64
	AuthorizedLevel int64
	Expires         time.Time
}
