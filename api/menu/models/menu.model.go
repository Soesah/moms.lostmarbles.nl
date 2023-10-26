package models

import "time"

type Menu struct {
	ID           int64           `json:"id"`
	Date         time.Time       `json:"date"` // the date of the saturday
	Year         int64           `json:"year"` // the year
	Week         int64           `json:"week"` // the week number
	Saturday     MealRef         `json:"saturday"`
	Sunday       MealRef         `json:"sunday"`
	Monday       MealRef         `json:"monday"`
	Tuesday      MealRef         `json:"tuesday"`
	Wednesday    MealRef         `json:"wednesday"`
	Thursday     MealRef         `json:"thursday"`
	Friday       MealRef         `json:"friday"`
	NextWeek     string          `json:"next_week,omitempty"`
	ShoppingList []IngredientRef `json:"shopping_list"`
}

type MenuData struct {
	Menus       []Menu       `json:"menus"`
	Meals       []Meal       `json:"meals"`
	Ingredients []Ingredient `json:"ingredients"`
}
