package menu

import (
	"net/http"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/api/menu/models"
	"github.com/Soesah/moms.lostmarbles.nl/api/util"
)

func GetMealStatistics(id int64, r *http.Request) (models.MenuStatistics, error) {
	var m models.MenuStatistics
	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return m, err
	}

	var allDates []models.MealRef

	for _, week := range c.Menus {
		allDates = append(allDates, week.Saturday, week.Sunday, week.Monday, week.Tuesday, week.Wednesday, week.Thursday, week.Friday)
	}

	// find all dates that we ate this
	var allDateEaten []models.MealRef
	var startDate time.Time = time.Now()
	var endDate time.Time = time.Date(2000, 1, 1, 0, 0, 0, 0, time.Local)
	for _, day := range allDates {
		if (day.MealID == id || util.ContainsInt(id, day.CombinationIDs)) && !day.IsLeftOvers {
			allDateEaten = append(allDateEaten, day)

			if day.Date.Before(startDate) {
				startDate = day.Date
			}

			if day.Date.After(endDate) {
				endDate = day.Date
			}
		}
	}

	meal, err := GetMeal(id, r)

	if err != nil {
		return m, err
	}
	m.Meal = meal

	// then from start to end, calculate how often per month, quarter and year
	m.PerYear = len(allDateEaten)
	// fill out the last date
	m.LastDate = endDate
	m.FirstDate = startDate
	// define which season sticks out?

	return m, nil
}
