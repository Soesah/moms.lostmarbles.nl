package handlers

import (
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
)

// ImportData is used to import data
func ImportData(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}

// ExportData is used to export data
func ExportData(w http.ResponseWriter, r *http.Request) {

	httpext.SuccessAPI(w, "ok")
}
