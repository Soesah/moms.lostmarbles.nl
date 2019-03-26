package util

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestMonthOnlyFormat(t *testing.T) {
	d, _ := time.Parse(DateFormat, "2018-07-09")
	assert.Equal(t, "07", d.Format(MonthOnlyFormat))
}

func TestFixDayOrdinal(t *testing.T) {
	d, _ := time.Parse(DateFormat, "2018-07-09")
	assert.Equal(t, "Monday, July 9th 2018", FixDayOrdinal(d.Format(LongDateFormat), LongDateFormat))

	d, _ = time.Parse(DateFormat, "2018-07-01")
	assert.Equal(t, "Sunday, July 1st 2018", FixDayOrdinal(d.Format(LongDateFormat), LongDateFormat))

	d, _ = time.Parse(DateFormat, "2018-07-02")
	assert.Equal(t, "Monday, July 2nd 2018", FixDayOrdinal(d.Format(LongDateFormat), LongDateFormat))

	d, _ = time.Parse(DateFormat, "2018-07-03")
	assert.Equal(t, "Tuesday, July 3rd 2018", FixDayOrdinal(d.Format(LongDateFormat), LongDateFormat))

	d, _ = time.Parse(DateFormat, "2018-07-03")
	assert.Equal(t, "Jul 3rd 2018", FixDayOrdinal(d.Format(BalanceFormat), BalanceFormat))
}
