package models

// Category is a grouping for recipes
type Category struct {
	ID           int64  `json:"id"`
	NameSingular string `json:"name_singular"`
	NamePlural   string `json:"name_plural"`
	Slug         string `json:"slug"`
	Position     int64  `json:"position"`
}
