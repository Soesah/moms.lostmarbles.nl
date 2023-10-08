package models

type Ingredient struct {
	ID       int64    `json:"id"`
	NameNL   string   `json:"name_nl"`
	NameEN   string   `json:"name_en,omitempty"`
	NameID   string   `json:"name_id,omitempty"`
	Keywords []string `json:"keywords,omitempty"`
	Type     string   `json:"type"`
}

type IngredientRef struct {
	ID     int64  `json:"id"`
	Amount string `json:"amount"`
	Unit   string `json:"unit"`
	Notes  string `json:"notes,omitempty"`
}
