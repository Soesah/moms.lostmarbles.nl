// +build appengine

package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/server/config"
	"github.com/Soesah/moms.lostmarbles.nl/server/handlers"
	"github.com/Soesah/moms.lostmarbles.nl/server/middlewares"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func main() {

	config.Init()
	conf := config.Get()

	r := chi.NewRouter()

	r.Route("/api", func(r chi.Router) {
		r.Use(middleware.DefaultCompress)
		r.Use(middleware.RequestID)
		r.Use(middleware.RealIP)
		r.Use(middleware.Logger)
		r.Use(middleware.Recoverer)
		r.Use(middleware.Timeout(60 * time.Second))
		r.Use(middleware.RedirectSlashes)

		r.Route("/recipe", func(r chi.Router) {
			r.Get("/new", handlers.GetNewRecipes)
			r.Group(func(r chi.Router) {
				r.Use(middlewares.CookContext)
				r.Get("/", handlers.GetRecipeList)
				r.Get("/{id}/{category_id}", handlers.GetRecipe)
				r.Get("/{id}/{category_id}/xml", handlers.GetRecipeXML)
				r.Group(func(r chi.Router) {
					r.Use(middlewares.NoCache)
					r.Use(middlewares.ChefContext)
					r.Post("/", handlers.CreateRecipe)
					r.Put("/{id}", handlers.UpdateRecipe)
				})
				r.Group(func(r chi.Router) {
					r.Use(middlewares.NoCache)
					r.Use(middlewares.AdminContext)
					r.Delete("/{id}", handlers.DeleteRecipe)
				})
			})
		})

		r.Route("/changes", func(r chi.Router) {
			r.Get("/latest", handlers.GetLatestChange)
			r.Group(func(r chi.Router) {
				r.Use(middlewares.CookContext)
				r.Get("/{id}", handlers.GetRecipeChanges)
			})
		})

		r.Route("/category", func(r chi.Router) {
			r.Get("/", handlers.GetCategoryList)

			r.Group(func(r chi.Router) {
				r.Use(middlewares.NoCache)
				r.Use(middlewares.ChefContext)
				r.Post("/", handlers.CreateCategory)
				r.Get("/{id}", handlers.GetCategory)
				r.Put("/{id}", handlers.UpdateCategory)
				r.Delete("/{id}", handlers.DeleteCategory)
			})
		})

		r.Route("/user", func(r chi.Router) {
			r.Use(middlewares.CookContext)
			r.Get("/", handlers.GetUserList)

			r.Group(func(r chi.Router) {
				r.Use(middlewares.NoCache)
				r.Use(middlewares.AdminContext)
				r.Post("/", handlers.CreateUser)
				r.Get("/{id}", handlers.GetUser)
				r.Put("/{id}", handlers.UpdateUser)
				r.Delete("/{id}", handlers.DeleteUser)
			})
		})

		r.Route("/editor", func(r chi.Router) {
			r.Use(middlewares.NoCache)
			r.Use(middlewares.AdminContext)
			r.Get("/xml/recipe.xml", handlers.XML)
		})

		r.Route("/auth", func(r chi.Router) {
			r.Get("/", handlers.GetAuth)
			r.Post("/login/{type}", handlers.Login)
			r.Get("/logout", handlers.Logout)
			r.Get("/clear-stale-sessions", handlers.ClearStaleSessions)
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

	http.Handle("/", r)

	if conf.IsDev() {
		log.Print(fmt.Sprintf("Dev server listening on port %d", 8182))
		log.Fatal(http.ListenAndServe(":8182", r))
	} else {
		log.Fatal(http.ListenAndServe(":8080", r))
	}
}
