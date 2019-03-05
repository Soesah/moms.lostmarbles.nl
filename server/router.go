package server

import (
	"github.com/Soesah/moms.lostmarbles.nl/server/handlers"
	"github.com/go-chi/chi"
)

// Router creates a new router with all the routes attached
func Router() *chi.Mux {

	// config.Init()

	r := chi.NewRouter()

	r.Route("/api", func(r chi.Router) {

		r.Get("/list", handlers.NotSupportedAPIHandler)
		r.Get("/categories", handlers.NotSupportedAPIHandler)

		r.Route("/recipe", func(r chi.Router) {
			r.Put("/", handlers.NotSupportedAPIHandler)
			r.Get("/{id}", handlers.NotSupportedAPIHandler)
			r.Post("/{id}", handlers.NotSupportedAPIHandler)
			r.Delete("/{id}", handlers.NotSupportedAPIHandler)
		})

		r.Route("/category", func(r chi.Router) {
			r.Put("/", handlers.NotSupportedAPIHandler)
			r.Get("/{id}", handlers.NotSupportedAPIHandler)
			r.Post("/{id}", handlers.NotSupportedAPIHandler)
			r.Delete("/{id}", handlers.NotSupportedAPIHandler)
		})

		r.Route("/user", func(r chi.Router) {
			r.Put("/", handlers.NotSupportedAPIHandler)
			r.Get("/{id}", handlers.NotSupportedAPIHandler)
			r.Post("/{id}", handlers.NotSupportedAPIHandler)
			r.Delete("/{id}", handlers.NotSupportedAPIHandler)
		})
	})

	r.Group(func(r chi.Router) {
		r.Get("/*", handlers.NotSupportedAPIHandler)
	})

	return r
}
