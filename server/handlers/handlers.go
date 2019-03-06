package handlers

import (
	"encoding/json"
	"html/template"
	"net/http"

	"github.com/Soesah/docs.front-crafter.nl/server/config"
	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
)

// RootHandler returns the index.html
func RootHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	t, err := template.ParseFiles(config.Get().DistFolder + "/index.html")

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	tmpl := template.Must(t, err)

	tmpl.Execute(w, "")
}

// NotSupportedAPIHandler returns a json response saying that this is not supported
func NotSupportedAPIHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	response := httpext.Response{
		Message: "API Not Supported",
	}

	data, err := json.Marshal(response)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNotFound)
	w.Write(data)
}
