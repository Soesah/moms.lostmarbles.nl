package handlers

import (
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
)

// GetCategoryList returns a list of categories
func GetCategoryList(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// CreateCategory creates a category
func CreateCategory(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// GetCategory returns a category
func GetCategory(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// UpdateCategory updates a category
func UpdateCategory(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// DeleteCategory deletes a category
func DeleteCategory(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}
