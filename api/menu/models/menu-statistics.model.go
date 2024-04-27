package models

import "time"

type MenuStatistics struct {
	Meal       Meal      `json:"meal"`
	PerMonth   int       `json:"per_month"`
	PerQuarter int       `json:"per_quarter"`
	PerYear    int       `json:"per_year"`
	FirstDate  time.Time `json:"first_date"`
	LastDate   time.Time `json:"last_date"`
}
