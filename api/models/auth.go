package models

import "time"

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
