package models

import (
	"encoding/xml"
	"regexp"
	"strconv"
	"strings"
)

// Recipe is a recipe
type Recipe struct {
	ID               int64        `json:"id"`
	CategoryID       int64        `json:"category_id"`
	Language         string       `json:"language"`
	Slug             string       `json:"slug"`
	Name             string       `json:"name"`
	Servings         string       `json:"servings,omitempty"`
	PreparationTime  string       `json:"preparation_time,omitempty"`
	Ingredients      []Ingredient `json:"ingredients,omitempty"`
	XML              string       `json:"xml,omitempty" datastore:",noindex"`
	CreationDate     string       `json:"creation_date"`
	ModificationDate string       `json:"modification_date"`
}

// GetXML returns a string of XML for the recipe
func (recipe Recipe) GetXML() string {

	id := strconv.Itoa(int(recipe.ID))
	categoryID := strconv.Itoa(int(recipe.CategoryID))
	r, _ := regexp.Compile("\n")

	return strings.Join([]string{
		"<recipe ",
		"id=\"", id, "\" ",
		"category_id=\"", categoryID, "\" ",
		"xml:lang=\"", recipe.Language, "\" ",
		"slug=\"", recipe.Slug, "\" ",
		"name=\"", recipe.Name, "\" ",
		"servings=\"", recipe.Servings, "\" ",
		"preparation_time=\"", recipe.PreparationTime, "\" ",
		"creation_date=\"", recipe.CreationDate, "\" ",
		"modification_date=\"", recipe.ModificationDate, "\" ",
		">",
		string(r.ReplaceAll([]byte(recipe.XML), []byte(""))),
		"</recipe>"},
		"")
}

// GetIngredients returns a struct for the recipes ingredients
func (recipe Recipe) GetIngredients() ([]Ingredient, error) {
	recipeXML := recipe.GetXML()
	r, _ := regexp.Compile("<ingredients>(.*)</ingredients>")
	ingredientsXML := r.FindString(recipeXML)
	var ingredients Ingredients
	err := xml.Unmarshal([]byte(ingredientsXML), &ingredients)
	if err != nil {
		return ingredients.Ingredients, err
	}
	return ingredients.Ingredients, nil
}

// Ingredients is a list of ingredients
type Ingredients struct {
	XMLName     xml.Name     `xml:"ingredients"`
	Ingredients []Ingredient `xml:"ingredient"`
}

// Ingredient is an ingredient of a recipe
type Ingredient struct {
	XMLName xml.Name `json:"-" xml:"ingredient"`
	Amount  string   `json:"amount" xml:"amount"`
	Name    string   `json:"name" xml:"name"`
	Remark  string   `json:"remark" xml:"remark"`
}
