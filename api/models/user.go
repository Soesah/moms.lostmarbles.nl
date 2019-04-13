package models

import "time"

const (
	// AdminLevel is for people who can edit recipes and users
	AdminLevel = 100
	// ChefLevel is for people who can edit recipes
	ChefLevel = 50
	// CookLevel is for people who can read recipes
	CookLevel = 0
	// GuestLevel is for people who can read recipes
	GuestLevel = -1
)

// User is a user
type User struct {
	ID            int64     `json:"id"`
	Name          string    `json:"name"`
	Search        string    `json:"-"`
	Password      string    `json:"password"`
	Email         string    `json:"email"`
	LastLoginDate time.Time `json:"last_login_date,omitempty"`
	UserLevel     int64     `json:"user_level"`
}
