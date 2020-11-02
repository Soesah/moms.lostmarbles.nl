package handlers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"github.com/Soesah/moms.lostmarbles.nl/api/recipe"
	"github.com/Soesah/moms.lostmarbles.nl/api/user"
	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
	"github.com/go-chi/chi"
)

// Change is a more readable form of Changelog
type Change struct {
	Type   string    `json:"type,omitempty"`
	Recipe string    `json:"recipe,omitempty"`
	User   string    `json:"user,omitempty"`
	Date   time.Time `json:"date,omitempty"`
}

// GetLatestChange returns the last change
func GetLatestChange(w http.ResponseWriter, r *http.Request) {

	c, err := recipe.GetLatestChange(r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	change := Change{
		Type: c.Type,
		Date: c.Date,
	}

	name, err := recipe.GetRecipeName(c.RecipeID, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	change.Recipe = name

	us, err := user.GetUser(c.UserID, r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	change.User = us.Name

	httpext.SuccessDataAPI(w, "Ok", change)
}

// GetRecipeChanges returns the latest changes for a particular recipe
func GetRecipeChanges(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, _ := strconv.Atoi(idParam)

	var log []Change

	changes, err := recipe.GetRecipeChanges(int64(id), r)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
		return
	}

	users, err := user.GetUserList(r)

	for _, c := range changes {
		log = append(log, Change{
			User: getUserName(users, c.UserID),
			Type: c.Type,
			Date: c.Date,
		})
	}

	httpext.SuccessDataAPI(w, "Ok", log)
}

func getUserName(users []models.User, ID int64) string {
	for _, u := range users {
		if u.ID == ID {
			return u.Name
		}
	}
	return ""
}
