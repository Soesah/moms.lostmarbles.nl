package models

import "time"

const (
	// Created is one of the possible values for Change.type
	Created = "created"
	// Changed is one of the possible values for Change.type
	Changed = "changed"
	// AddNote is one of the possible values for Change.type
	AddNote = "add note"
)

// ChangeLog is a change log item
type ChangeLog struct {
	ID       int64     `json:"id"`
	UserID   int64     `json:"user_id"`
	RecipeID int64     `json:"recipe_id"`
	Type     string    `json:"type"`
	Date     time.Time `json:"date"`
}
