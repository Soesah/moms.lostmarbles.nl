package models

import "time"

// Usage type is used to track people viewing recipes
type Usage struct {
	ID       int64     `json:"id"`
	RecipeID int64     `json:"recipe_id"`
	Date     time.Time `json:"date"`
	UserID   int64     `json:"user_id"`
}
