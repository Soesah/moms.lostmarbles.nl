package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"github.com/Soesah/moms.lostmarbles.nl/api/system"
	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
)

// ImportRecipes is used to import recipes
func ImportRecipes(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var recipes []models.Recipe
	err := decoder.Decode(&recipes)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = system.ImportRecipes(recipes, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessAPI(w, "ok")
}

// ImportCategories is used to import categories
func ImportCategories(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var categories []models.Category
	err := decoder.Decode(&categories)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = system.ImportCategories(categories, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessAPI(w, "ok")
}

// ImportUsers is used to import users
func ImportUsers(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var users []models.User
	err := decoder.Decode(&users)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = system.ImportUsers(users, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessAPI(w, "ok")
}

// ImportChangelog is used to import changelog
func ImportChangelog(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var changelog []models.ChangeLog
	err := decoder.Decode(&changelog)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = system.ImportChangelog(changelog, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessAPI(w, "ok")
}

// ExportData is used to export data
func ExportData(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// ClearAll is used to export data
func ClearAll(w http.ResponseWriter, r *http.Request) {

	err := system.ClearAll(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessAPI(w, "Cleared all")
}
