package models

import (
	"encoding/xml"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/api/util"
)

// RecipeJSON is a Recipe, which has Notes and Ingredients as JSON
type RecipeJSON struct {
	ID               int64        `json:"id"`
	CategoryID       int64        `json:"category_id"`
	Language         string       `json:"language"`
	Slug             string       `json:"slug"`
	Name             string       `json:"name"`
	Servings         string       `json:"servings"`
	PreparationTime  string       `json:"preparation_time"`
	XML              string       `json:"xml" datastore:",noindex"`
	CreationDate     time.Time    `json:"creation_date"`
	ModificationDate time.Time    `json:"modification_date"`
	Ingredients      []Ingredient `json:"ingredients"`
	Notes            []Note       `json:"notes"`
}

// GetXML returns a string of XML for the recipe
func (recipe RecipeJSON) GetXML() string {

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
func (recipe RecipeJSON) GetIngredients() ([]Ingredient, error) {
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

// GetNotes returns a struct for the recipes ingredients
func (recipe RecipeJSON) GetNotes() ([]Note, error) {
	recipeXML := recipe.GetXML()
	r, _ := regexp.Compile("<notes>(.*)</notes>")
	notesXML := r.FindString(recipeXML)
	var notes Notes
	err := xml.Unmarshal([]byte(notesXML), &notes)
	if err != nil {
		return notes.Notes, err
	}
	return notes.Notes, nil
}
