package models

import "time"

type Menu struct {
	ID        int64     `json:"id"`
	Date      time.Time `json:"date"` // the date of the saturday
	Saturday  MealRef   `json:"saturday"`
	Sunday    MealRef   `json:"sunday"`
	Monday    MealRef   `json:"monday"`
	Tuesday   MealRef   `json:"tuesday"`
	Wednesday MealRef   `json:"wednesday"`
	Thursday  MealRef   `json:"thursday"`
	Friday    MealRef   `json:"friday"`
	NextWeek  string    `json:"next_week"`
}

type MenuData struct {
	Menus       []Menu       `json:"menus"`
	Meals       []Meal       `json:"meals"`
	Ingredients []Ingredient `json:"ingredients"`
}
