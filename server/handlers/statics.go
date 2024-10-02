package handlers

import (
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
)

// ServeDir servies any file of a directory
func ServeDir(r chi.Router, path string, root http.Dir) {
	filePath := path

	filePath = strings.TrimSuffix(filePath, "*")

	fs := http.StripPrefix(filePath, http.FileServer(root))

	r.Get(path, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fs.ServeHTTP(w, r)
	}))
}

// ServeFile serves a single file
func ServeFile(r chi.Router, path string, filePath string) {
	r.Get(path, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filePath)
	}))
}

// XML is a dummy
func XML(w http.ResponseWriter, r *http.Request) {
	xml := []byte("<?xml version='1.0' encoding='UTF-8'?><recipe id='1' slug='fried-egg' servings='1' preparation_time='20 min' category_id='1'><title>Fried Egg</title><ingredients><ingredient><name>Egg</name></ingredient><ingredient><name>Salt &amp; pepper</name></ingredient></ingredients><preparation><step><p>Break the egg in the pan</p></step><step><p>Fry the egg, and add some peper and salt</p></step><step><p>Flip the egg</p></step></preparation></recipe>")
	w.Header().Add("Content-Type", "application/xml")
	w.Write(xml)
}
