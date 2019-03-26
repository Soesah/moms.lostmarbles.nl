package util

import (
	"strings"
	"time"
)

var (
	RFC3339Format            = "2006-01-02T15:04:05.000Z"
	FullFormat               = "Monday, 02-Jan-06 15:04:05"
	LongDateFormat           = "Monday, January 2xx 2006"
	DateFormat               = "2006-01-02"
	DateTimeFormat           = "2006-01-02 15:04:05"
	MonthFormat              = "2006-01"
	MonthOnlyFormat          = "01"
	YearFormat               = "2006"
	DocumentNumberYearFormat = "06"
	TitleFormat              = "January 2006"
	ShortDayFormat           = "Mon"
	BalanceFormat            = "Jan 2xx 2006"
)

// FixDayOrdinal fixes the xx in the format to a proper english ordinal
func FixDayOrdinal(date string, format string) string {
	var ord string
	d, _ := time.Parse(format, date)

	switch d.Day() {
	case 1, 21, 31:
		ord = "st"
	case 2, 22:
		ord = "nd"
	case 3, 23:
		ord = "rd"
	default:
		ord = "th"
	}

	return strings.Replace(date, "xx", ord, 1)
}
