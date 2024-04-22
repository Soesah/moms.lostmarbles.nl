package handlers

import (
	"encoding/json"
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

// AddRecipe creates a recipe
func AddRecipe(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var update models.Recipe
	err := decoder.Decode(&update)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rec, err := recipe.AddRecipe(update, r)

	if err == recipe.ErrRecipeAlreadyExists {
		httpext.AbortAPI(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", rec)
}

func getRecipe(_ http.ResponseWriter, r *http.Request) (models.RecipeJSON, error) {
	var re models.RecipeJSON

	idParam := chi.URLParam(r, "id")
	id, _ := strconv.Atoi(idParam)

	re, err := recipe.GetRecipe(int64(id), r)

	if err != nil {
		return re, err
	}

	return re, nil
}

// GetNewRecipes returns the last two created recipes
func GetNewRecipes(w http.ResponseWriter, r *http.Request) {
	recipes, err := recipe.GetNewRecipes(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", recipes)
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
	decoder := json.NewDecoder(r.Body)
	var update models.Recipe
	err := decoder.Decode(&update)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rec, err := recipe.UpdateRecipe(update, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", rec)
}

// DeleteRecipe deletes a recipe
func DeleteRecipe(w http.ResponseWriter, r *http.Request) {

	idParam := chi.URLParam(r, "id")
	id, _ := strconv.Atoi(idParam)

	err := recipe.DeleteRecipe(int64(id), r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessAPI(w, "ok")
}

// AddNoteToRecipe adds a note to a recipe
func AddNoteToRecipe(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var update models.Recipe
	err := decoder.Decode(&update)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rec, err := recipe.UpdateRecipeWithNote(update, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", rec)
}

// ConvertRecipes adds a note to a recipe
func ConvertRecipes(w http.ResponseWriter, r *http.Request) {
	err := recipe.ConvertRecipes(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessAPI(w, "Ok")
}
