package main

import (
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
			r.Get("/convert", handlers.ConvertRecipes)
			r.Group(func(r chi.Router) {
				r.Use(middlewares.CookContext)
				r.Get("/", handlers.GetRecipeList)
				r.Get("/{id}", handlers.GetRecipe)
				r.Get("/{id}/xml", handlers.GetRecipeXML)
				r.Group(func(r chi.Router) {
					r.Use(middlewares.NoCache)
					r.Use(middlewares.ChefContext)
					r.Post("/", handlers.AddRecipe)
					r.Put("/{id}/note", handlers.AddNoteToRecipe)
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

		r.Route("/menu", func(r chi.Router) {
			r.Get("/analyze", handlers.GetFirstNotAnalyzed)
			r.Put("/analyze/{id}", handlers.UpdateAnalyzed)
			r.Get("/id/{id}", handlers.GetMenu)
			r.Get("/{year}/{week}", handlers.GetMenu)
			r.Post("/", handlers.CreateMenu)
			r.Put("/", handlers.UpdateMenu)
			r.Delete("/id", handlers.RemoveMenu)
			r.Get("/ingredient", handlers.GetIngredients)
			r.Post("/ingredient", handlers.CreateIngredient)
			r.Put("/ingredient", handlers.UpdateIngredient)
			r.Delete("/ingredient/{id}", handlers.RemoveIngredient)
			r.Get("/meal", handlers.GetMeals)
			r.Post("/meal", handlers.CreateMeal)
			r.Put("/meal", handlers.UpdateMeal)
			r.Delete("/meal{id}", handlers.RemoveMeal)
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
		handlers.ServeDir(r, "/img/*", http.Dir("./public/img"))
		handlers.ServeFile(r, "/favicon.ico*", "./dist/favicon.ico")
		handlers.ServeFile(r, "/*", "./dist/index.html")
	})

	r.Group(func(r chi.Router) {
		r.Get("/*", handlers.RootHandler)
	})

	http.Handle("/", r)

	if conf.IsDev() {
		log.Printf("Dev server listening on port %d", 8182)
		log.Fatal(http.ListenAndServe(":8182", r))
	} else {
		log.Fatal(http.ListenAndServe(":8080", r))
	}
}
