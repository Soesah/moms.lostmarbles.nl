package handlers

import (
	"net/http"
	"strconv"

	"github.com/Soesah/moms.lostmarbles.nl/api/recipe"
	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
	"github.com/go-chi/chi"
)

// GetLatestChanges returns the latest changes
func GetLatestChanges(w http.ResponseWriter, r *http.Request) {

	changes, err := recipe.GetLatestChanges(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", changes)
}

// GetRecipeChanges returns the latest changes for a particular recipe
func GetRecipeChanges(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, _ := strconv.Atoi(idParam)

	changes, err := recipe.GetRecipeChanges(int64(id), r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	httpext.SuccessDataAPI(w, "Ok", changes)
}
