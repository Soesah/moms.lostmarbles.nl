package models

type Meal struct {
	ID          int64           `json:"id"`
	Name        string          `json:"name"`
	Ingredients []IngredientRef `json:"ingredients"`
	// filter values
	Vegetarian bool `json:"vegetarian,omitempty"`
	Chicken    bool `json:"chicken,omitempty"`
	Beef       bool `json:"beef,omitempty"`
	Pork       bool `json:"pork,omitempty"`
	Fish       bool `json:"fish,omitempty"`
	Pasta      bool `json:"pasta,omitempty"`
	Rice       bool `json:"rice,omitempty"`
	Potatoes   bool `json:"potatoes,omitempty"`
}

type MealRef struct {
	ID    int64  `json:"id,omitempty"` // ID of Meal
	Date  bool   `json:"date"`
	Out   bool   `json:"out"` // Eating out
	Notes string `json:"notes,omitempty"`
}
