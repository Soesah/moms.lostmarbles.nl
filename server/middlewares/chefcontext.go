package middlewares

import (
	"context"
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api/auth"
	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
)

// ChefContext sets a boolean in context
func ChefContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		session, err := auth.GetSession(r)

		if err != nil || session.UserLevel < models.ChefLevel {
			httpext.AbortAPI(w, "Access denied", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), httpext.ChefContextKey, true)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
