package server

import (
	"net/http"
	"time"

	"github.com/Soesah/docs.front-crafter.nl/server/middlewares"
	"github.com/Soesah/moms.lostmarbles.nl/server/handlers"
	"github.com/go-chi/chi"
)

// Router creates a new router with all the routes attached
func Router() *chi.Mux {

	// config.Init()

	r := chi.NewRouter()

	r.Route("/api", func(r chi.Router) {

		r.Route("/recipe", func(r chi.Router) {
			r.Get("/", handlers.GetRecipeList)
			r.Put("/", handlers.CreateRecipe)
			r.Get("/{id}", handlers.GetRecipe)
			r.Post("/{id}", handlers.UpdateRecipe)
			r.Delete("/{id}", handlers.DeleteRecipe)
		})

		r.Route("/category", func(r chi.Router) {
			r.Get("/", handlers.GetCategoryList)
			r.Put("/", handlers.CreateCategory)
			r.Get("/{id}", handlers.GetCategory)
			r.Post("/{id}", handlers.UpdateCategory)
			r.Delete("/{id}", handlers.DeleteCategory)
		})

		r.Route("/user", func(r chi.Router) {
			r.Get("/", handlers.GetUserList)
			r.Put("/", handlers.CreateUser)
			r.Get("/{id}", handlers.GetUser)
			r.Post("/{id}", handlers.UpdateUser)
			r.Delete("/{id}", handlers.DeleteUser)
		})

		r.Route("/system", func(r chi.Router) {
			r.Post("/import", handlers.ImportData)
			r.Get("/export", handlers.ExportData)
		})

	})

	// static
	r.Group(func(r chi.Router) {
		r.Use(middlewares.Cache(24 * time.Hour))
		handlers.ServeDir(r, "/js/*", http.Dir("./dist/js"))
		handlers.ServeDir(r, "/css/*", http.Dir("./dist/css"))
		handlers.ServeDir(r, "/fonts/*", http.Dir("./dist/fonts"))
		handlers.ServeFile(r, "/favicon.ico*", "./dist/favicon.ico")
		handlers.ServeFile(r, "/*", "./dist/index.html")
	})

	r.Group(func(r chi.Router) {
		r.Get("/*", handlers.RootHandler)
	})

	return r
}
