package models

type Ingredient struct {
	ID             int64    `json:"id"`
	Name           string   `json:"name"`
	NameVariations []string `json:"name_variations"`
	Type           string   `json:"type"`
}

type IngredientRef struct {
	ID     int64  `json:"id"`
	Amount string `json:"amount"`
	Unit   string `json:"unit"`
	Notes  string `json:"notes,omitempty"`
}
