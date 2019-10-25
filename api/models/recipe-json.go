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
	Cook             string       `json:"cook"`
	Servings         string       `json:"servings"`
	PreparationTime  string       `json:"preparation_time"`
	XML              string       `json:"-"`
	CreationDate     time.Time    `json:"creation_date"`
	ModificationDate time.Time    `json:"modification_date"`
	Ingredients      []Ingredient `json:"ingredients"`
	Steps            []Step       `json:"steps"`
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

// GetCook returns a struct for the recipes ingredients
func (recipe RecipeJSON) GetCook() string {
	recipeXML := recipe.GetXML()
	r, _ := regexp.Compile("<cook>(.*)</cook>")
	cookXML := r.FindString(recipeXML)
	var cook Cook
	err := xml.Unmarshal([]byte(cookXML), &cook)
	if err != nil {
		return ""
	}
	return cook.Value
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

// GetPreparation returns a struct for the recipes preparation
func (recipe RecipeJSON) GetPreparation() (Preparation, error) {
	recipeXML := recipe.GetXML()
	r, _ := regexp.Compile("<preparation>(.*)</preparation>")
	preparationXML := r.FindString(recipeXML)
	var preparation Preparation
	err := xml.Unmarshal([]byte(preparationXML), &preparation)
	if err != nil {
		return preparation, err
	}
	return preparation, nil
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
