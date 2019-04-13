package middlewares

import (
	"context"
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api/auth"
	"github.com/Soesah/moms.lostmarbles.nl/api/models"
	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
)

// AdminContext sets a boolean in context, and otherwise sends an Access Denied
func AdminContext(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		session, err := auth.GetSession(r)

		if err != nil || session.UserLevel < models.AdminLevel {
			httpext.AbortAPI(w, "Access denied", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), httpext.AdminContextKey, true)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
