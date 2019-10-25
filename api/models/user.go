package models

import (
	"strings"
	"time"
)

const (
	// AdminLevel is for people who can edit recipes and users
	AdminLevel = 100
	// ChefLevel is for people who can edit recipes
	ChefLevel = 50
	// CookLevel is for people who can read recipes
	CookLevel = 0
)

// User is a user
type User struct {
	ID            int64     `json:"id"`
	Name          string    `json:"name"`
	Password      string    `json:"pass,omitempty"`
	Email         string    `json:"email,omitempty"`
	LastLoginDate time.Time `json:"last_login_date,omitempty"`
	UserLevel     int64     `json:"user_level,omitempty"`
}

// Search is used to search a user
func (u *User) Search() string {
	return strings.ToLower(u.Name)
}
