package models

import "time"

// Meal is a dish that can be cookes with its ingredients. It denotes it base (carbohydrate) and type (protein)
type Meal struct {
	ID             int64           `json:"id"`
	Name           string          `json:"name"`
	Ingredients    []IngredientRef `json:"ingredients"`
	BasePasta      bool            `json:"base_pasta,omitempty"`
	BaseNoodles    bool            `json:"base_noodles,omitempty"`
	BaseRice       bool            `json:"base_rice,omitempty"`
	BasePotatoes   bool            `json:"base_potatoes,omitempty"`
	TypeVegetarian bool            `json:"type_vegetarian,omitempty"`
	TypeChicken    bool            `json:"type_chicken,omitempty"`
	TypeBeef       bool            `json:"type_beef,omitempty"`
	TypePork       bool            `json:"type_pork,omitempty"`
	TypeFish       bool            `json:"type_fish,omitempty"`
	VariationOf    int64           `json:"variation_of,omitempty"`
	RecipeURL      string          `json:"recipe_url,omitempty"`
}

type MealRef struct {
	ID        int64     `json:"id,omitempty"` // ID of Meal
	Date      time.Time `json:"date"`
	Out       bool      `json:"out,omitempty"`        // Eating out
	LeftOvers bool      `json:"left_overs,omitempty"` // Eating left overs
	Notes     string    `json:"notes,omitempty"`
}
