package handlers

import (
	"net/http"
	"strconv"

	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"github.com/Soesah/moms.lostmarbles.nl/api/recipe"
	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
	"github.com/go-chi/chi"
)

// GetRecipeList returns a list of recipes
func GetRecipeList(w http.ResponseWriter, r *http.Request) {
	recipes, err := recipe.GetRecipeList(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", recipes)
}

// CreateRecipe creates a recipe
func CreateRecipe(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

func getRecipe(w http.ResponseWriter, r *http.Request) (models.Recipe, error) {
	var re models.Recipe

	idParam := chi.URLParam(r, "id")
	categoryIDParam := chi.URLParam(r, "category_id")
	id, _ := strconv.Atoi(idParam)
	categoryID, _ := strconv.Atoi(categoryIDParam)

	re, err := recipe.GetRecipe(int64(id), int64(categoryID), r)

	if err != nil {
		return re, err
	}

	return re, nil
}

// GetRecipe returns a recipe
func GetRecipe(w http.ResponseWriter, r *http.Request) {

	recipe, err := getRecipe(w, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", recipe)
}

// GetRecipeXML returns a recipe's xml
func GetRecipeXML(w http.ResponseWriter, r *http.Request) {
	recipe, err := getRecipe(w, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessXMLAPI(w, recipe.GetXML())
}

// UpdateRecipe updates a recipe
func UpdateRecipe(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// DeleteRecipe deletes a recipe
func DeleteRecipe(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}
