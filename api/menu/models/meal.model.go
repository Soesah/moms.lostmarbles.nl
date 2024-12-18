package models

import "time"

// Meal is a dish that can be cookes with its ingredients. It denotes it base (carbohydrate) and type (protein)
type Meal struct {
	ID             int64           `json:"id"`
	NameNL         string          `json:"name_nl"`
	NameEN         string          `json:"name_en,omitempty"`
	NameID         string          `json:"name_id,omitempty"`
	NamePreference string          `json:"name_pref,omitempty"`
	Keywords       []string        `json:"keywords,omitempty"`
	Culture        string          `json:"culture,omitempty"`
	Ingredients    []IngredientRef `json:"ingredients,omitempty"`
	BasePasta      bool            `json:"base_pasta,omitempty"`
	BaseNoodles    bool            `json:"base_noodles,omitempty"`
	BaseRice       bool            `json:"base_rice,omitempty"`
	BasePotatoes   bool            `json:"base_potatoes,omitempty"`
	BaseBread      bool            `json:"base_bread,omitempty"`
	BaseWrap       bool            `json:"base_wrap,omitempty"`
	TypeVegetarian bool            `json:"type_vegetarian,omitempty"`
	TypeChicken    bool            `json:"type_chicken,omitempty"`
	TypeBeef       bool            `json:"type_beef,omitempty"`
	TypePork       bool            `json:"type_pork,omitempty"`
	TypeFish       bool            `json:"type_fish,omitempty"`
	VariationOf    int64           `json:"variation_of,omitempty"`
	RecipeURLs     []string        `json:"recipe_urls,omitempty"`
	SideDish       bool            `json:"side_dish,omitempty"`
	HasLeftOvers   bool            `json:"has_left_overs,omitempty"`
}

type MealRef struct {
	Date           time.Time `json:"date"`
	MealID         int64     `json:"meal_id,omitempty"`         // ID of Meal
	CombinationIDs []int64   `json:"combination_ids,omitempty"` // ID of combination or leftover meals
	Notes          string    `json:"notes,omitempty"`
	IsOut          bool      `json:"is_out,omitempty"`        // Eating out
	IsLeftOvers    bool      `json:"is_left_overs,omitempty"` // Eating left overs
	IsUndecided    bool      `json:"is_undecided,omitempty"`  // Not known yet
}
