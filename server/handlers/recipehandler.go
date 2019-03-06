package handlers

import (
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
)

// GetRecipeList returns a list of recipes
func GetRecipeList(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// CreateRecipe creates a recipe
func CreateRecipe(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// GetRecipe returns a recipe
func GetRecipe(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// UpdateRecipe updates a recipe
func UpdateRecipe(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// DeleteRecipe deletes a recipe
func DeleteRecipe(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}
