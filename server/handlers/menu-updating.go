package handlers

import (
	"encoding/json"
	"net/http"
	"os"
	"strings"

	"github.com/Soesah/moms.lostmarbles.nl/api/menu/models"
	"github.com/Soesah/moms.lostmarbles.nl/server/httpext"
)

func UpdateMenus(w http.ResponseWriter, r *http.Request) {
	var menuData models.MenuData

	dir, _ := os.Getwd()
	bytes, err := os.ReadFile(strings.Join([]string{dir, "/data/menu.json"}, ""))

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
	}

	err = json.Unmarshal(bytes, &menuData)

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
	}

	var menus []models.Menu

	for _, menu := range menuData.Menus {
		menu.Saturday = updateDay(menu.Saturday)
		menu.Sunday = updateDay(menu.Sunday)
		menu.Monday = updateDay(menu.Monday)
		menu.Tuesday = updateDay(menu.Tuesday)
		menu.Wednesday = updateDay(menu.Wednesday)
		menu.Thursday = updateDay(menu.Thursday)
		menu.Friday = updateDay(menu.Friday)

		menus = append(menus, menu)
	}

	menuData.Menus = menus

	data, err := json.MarshalIndent(menuData, "", "  ")

	if err != nil {
		httpext.AbortAPI(w, err.Error(), http.StatusInternalServerError)
	}

	os.WriteFile("./data/menu.json", data, 0644)

	httpext.JSON(w, menuData)
}

func updateDay(day models.MealRef) models.MealRef {

	// add rice and vegetables to combined for karaage and Buikspek
	// buikspek = 29
	// babi kecap = 4
	// karaage = 34
	// rice and vegetable = 111
	if (day.MealID == 29 || day.MealID == 34) && !containsInt(111, day.CombinationIDs) {
		day.CombinationIDs = append(day.CombinationIDs, 111)
	}
	if day.MealID == 4 && !containsInt(111, day.CombinationIDs) && (day.Notes == "met rijst en groente" || day.Notes == "met groente en rijst") {
		day.CombinationIDs = append(day.CombinationIDs, 111)
		day.Notes = ""
	}

	return day
}

func containsInt(s int64, list []int64) bool {
	contains := false

	for i := 0; i < len(list); i++ {
		if list[i] == s {
			contains = true
		}
	}

	return contains
}
