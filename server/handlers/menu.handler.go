package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Soesah/moms.lostmarbles.nl/api/menu"
	"github.com/Soesah/moms.lostmarbles.nl/api/menu/models"
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

// GetIngredients
func GetIngredients(w http.ResponseWriter, r *http.Request) {
	ings, err := menu.GetIngredients(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", ings)
}

// CreateIngredient
func CreateIngredient(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var update models.Ingredient
	err := decoder.Decode(&update)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rec, err := menu.CreateIngredient(update, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", rec)
}

// UpdateIngredient
func UpdateIngredient(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var update models.Ingredient
	err := decoder.Decode(&update)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rec, err := menu.UpdateIngredient(update, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", rec)
}

// RemoveIngredient
func RemoveIngredient(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, _ := strconv.Atoi(idParam)

	err := menu.RemoveIngredient(int64(id), r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessAPI(w, "Ok")
}

// GetMeals
func GetMeals(w http.ResponseWriter, r *http.Request) {
	ings, err := menu.GetMeals(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", ings)
}

// CreateMeal
func CreateMeal(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var update models.Meal
	err := decoder.Decode(&update)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rec, err := menu.CreateMeal(update, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", rec)
}

// UpdateMeal
func UpdateMeal(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var update models.Meal
	err := decoder.Decode(&update)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rec, err := menu.UpdateMeal(update, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", rec)
}

// RemoveMeal
func RemoveMeal(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, _ := strconv.Atoi(idParam)

	err := menu.RemoveMeal(int64(id), r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessAPI(w, "Ok")
}

// GetMenu
func GetMenu(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, _ := strconv.Atoi(idParam)
	yearParam := chi.URLParam(r, "year")
	year, _ := strconv.Atoi(yearParam)
	weekParam := chi.URLParam(r, "week")
	week, _ := strconv.Atoi(weekParam)

	m, err := menu.GetMenu(id, year, week, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", m)
}

// GetMenuStatistics
func GetMealStatistics(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, _ := strconv.Atoi(idParam)

	m, err := menu.GetMealStatistics(int64(id), r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", m)
}

// CreateMenu
func CreateMenu(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var update models.Menu
	err := decoder.Decode(&update)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rec, err := menu.CreateMenu(update, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", rec)
}

// UpdateMenu
func UpdateMenu(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var update models.Menu
	err := decoder.Decode(&update)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rec, err := menu.UpdateMenu(update, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", rec)
}

// RemoveMenu
func RemoveMenu(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, _ := strconv.Atoi(idParam)

	err := menu.RemoveMenu(int64(id), r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessAPI(w, "Ok")
}
