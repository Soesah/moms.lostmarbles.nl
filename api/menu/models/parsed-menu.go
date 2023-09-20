package models

import "time"

type ParsedMenuDay struct {
	Date      time.Time `json:"date,omitempty"`
	Meal      string    `json:"meal,omitempty"`
	Urls      []string  `json:"urls,omitempty"`
	LeftOvers bool      `json:"left_over,omitempty"`
}

type ParsedIngredient struct {
	Name     string `json:"name,omitempty"`
	Amount   string `json:"amount,omitempty"`
	Notes    string `json:"notes,omitempty"`
	Optional bool   `json:"optional,omitempty"`
}

type ParsedMenu struct {
	ID          int                `json:"id,omitempty"`
	File        string             `json:"file,omitempty"`
	Date        time.Time          `json:"date,omitempty"`
	Subject     string             `json:"subject,omitempty"`
	Year        int                `json:"year,omitempty"`
	Week        int                `json:"week,omitempty"`
	Saturday    ParsedMenuDay      `json:"saturday,omitempty"`
	Sunday      ParsedMenuDay      `json:"sunday,omitempty"`
	Monday      ParsedMenuDay      `json:"monday,omitempty"`
	Tuesday     ParsedMenuDay      `json:"tuesday,omitempty"`
	Wednesday   ParsedMenuDay      `json:"wednesday,omitempty"`
	Thursday    ParsedMenuDay      `json:"thursday,omitempty"`
	Friday      ParsedMenuDay      `json:"friday,omitempty"`
	NextWeek    string             `json:"next_week,omitempty"`
	Ingredients []ParsedIngredient `json:"ingredients"`
	Analyzed    bool               `json:"analyzed"`
}

func (m ParsedMenu) IsValid() bool {
	isValid := true

	if m.Date.IsZero() {
		isValid = false
	}

	if m.Subject == "" {
		isValid = false
	}

	if m.Saturday.Date.Weekday() != time.Saturday {
		isValid = false
	}

	if m.Saturday.Meal == "" || m.Monday.Meal == "" || m.Tuesday.Meal == "" || m.Wednesday.Meal == "" || m.Thursday.Meal == "" || m.Friday.Meal == "" {
		isValid = false
	}

	if m.Saturday.Date.IsZero() || m.Monday.Date.IsZero() || m.Tuesday.Date.IsZero() || m.Wednesday.Date.IsZero() || m.Thursday.Date.IsZero() || m.Friday.Date.IsZero() {
		isValid = false
	}

	return isValid
}
