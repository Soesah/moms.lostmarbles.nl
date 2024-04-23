package models

type Ingredient struct {
	ID             int64    `json:"id"`
	NameNL         string   `json:"name_nl"`
	NameEN         string   `json:"name_en,omitempty"`
	NameID         string   `json:"name_id,omitempty"`
	NamePreference string   `json:"name_pref,omitempty"`
	Keywords       []string `json:"keywords,omitempty"`
	Type           string   `json:"type,omitempty"`
}

type IngredientRef struct {
	ID     int64  `json:"id"`
	Amount string `json:"amount,omitempty"`
	Unit   string `json:"unit,omitempty"`
	Notes  string `json:"notes,omitempty"`
}
