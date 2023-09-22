package handlers

import (
	"net/http"
	"strconv"

	"github.com/Soesah/moms.lostmarbles.nl/api/menu"
	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
	"github.com/go-chi/chi"
)

// GetFirstNotAnalyzed
func GetFirstNotAnalyzed(w http.ResponseWriter, r *http.Request) {

	m, err := menu.GetFirstNotAnalyzed(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", m)
}

// UpdateAnalyzed
func UpdateAnalyzed(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, _ := strconv.Atoi(idParam)

	m, err := menu.UpdateAnalyzed(int(id), r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", m)
}

// CreateIngredient
func CreateIngredient(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "Ok")
}

// CreateMeal
func CreateMeal(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "Ok")
}

// UpdateIngredient
func UpdateIngredient(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "Ok")
}

// RemoveIngredient
func RemoveIngredient(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "Ok")
}

// UpdateMeal
func UpdateMeal(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "Ok")
}

// RemoveMeal
func RemoveMeal(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "Ok")
}

// CreateMenu
func CreateMenu(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "Ok")
}

// UpdateMenu
func UpdateMenu(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "Ok")
}

// RemoveMenu
func RemoveMenu(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "Ok")
}
