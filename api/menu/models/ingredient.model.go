package models

type Ingredient struct {
	ID    int64  `json:"id"`
	Name  string `json:"name"`
	Type  string `json:"type"`
	Notes string `json:"notes,omitempty"`
}

type IngredientRef struct {
	ID     int64  `json:"id"`
	Amount string `json:"amount"`
	Notes  string `json:"notes,omitempty"`
}
