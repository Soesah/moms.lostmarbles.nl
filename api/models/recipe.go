package models

// Recipe is a recipe
type Recipe struct {
	ID               int64        `json:"id"`
	CategoryID       int64        `json:"category_id"`
	Language         string       `json:"language"`
	Slug             string       `json:"slug"`
	Name             string       `json:"name"`
	Servings         string       `json:"servings,omitempty"`
	PreparationTime  string       `json:"preparation_time,omitempty"`
	Ingredients      []Ingredient `json:"ingredients"`
	Steps            []string     `json:"steps"`
	Notes            []Note       `json:"notes"`
	XML              string       `json:"xml,omitempty"`
	CreationDate     string       `json:"creation_date"`
	ModificationDate string       `json:"modification_date"`
}

// Ingredient is an ingredient of a recipe
type Ingredient struct {
	Amount string `json:"amount"`
	Name   string `json:"name"`
	Remark string `json:"remark"`
}

// Note is a note that goes with a recipe
type Note struct {
	Name     string `json:"name"`
	MarkDown string `json:"mark_down"`
}
