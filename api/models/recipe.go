package models

import (
	"encoding/xml"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/api/util"
)

// Recipe is a recipe
type Recipe struct {
	ID               int64     `json:"id"`
	CategoryID       int64     `json:"category_id"`
	Language         string    `json:"language"`
	Slug             string    `json:"slug"`
	Name             string    `json:"name"`
	Servings         string    `json:"servings"`
	PreparationTime  string    `json:"preparation_time"`
	XML              string    `json:"xml" datastore:",noindex"`
	CreationDate     time.Time `json:"creation_date"`
	ModificationDate time.Time `json:"modification_date"`
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
		"creation_date=\"", recipe.CreationDate.Format(util.RFC3339Format), "\" ",
		"modification_date=\"", recipe.ModificationDate.Format(util.RFC3339Format), "\" ",
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

// Notes is the list of notes of a recipe
type Notes struct {
	XMLName xml.Name `json:"-" xml:"notes"`
	Notes   []Note   `xml:"note"`
}

// Note is a note of a recipe
type Note struct {
	XMLName   xml.Name `json:"-" xml:"note"`
	Author    string   `json:"author" xml:"author"`
	Paragraph []string `json:"paragraph" xml:"paragraph"`
}

// RecipeItem is used for the recipe list
type RecipeItem struct {
	ID          int64        `json:"id"`
	CategoryID  int64        `json:"category_id"`
	Slug        string       `json:"slug"`
	Name        string       `json:"name"`
	Ingredients []Ingredient `json:"ingredients"`
	IsNew       bool         `json:"is_new"`
}
