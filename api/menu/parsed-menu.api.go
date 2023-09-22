package menu

import (
	"errors"
	"net/http"
	"slices"

	"github.com/Soesah/moms.lostmarbles.nl/api/menu/models"
)

var errNoMenuFound = errors.New("no unanalyzed menu found")

func GetFirstNotAnalyzed(r *http.Request) (models.ParsedMenu, error) {
	var m models.ParsedMenu

	c := ParsedController{}
	err := c.Load(r)

	if err != nil {
		return m, err
	}

	slices.Reverse(c.Menus)
	for _, me := range c.Menus {
		if !me.Analyzed {
			m = me
			break
		}
	}

	if m.ID == 0 {
		return m, errNoMenuFound
	}

	return m, nil
}

func UpdateAnalyzed(id int, r *http.Request) (models.ParsedMenu, error) {
	var m models.ParsedMenu

	c := ParsedController{}
	err := c.Load(r)

	if err != nil {
		return m, err
	}

	var updated []models.ParsedMenu

	for _, me := range c.Menus {
		if me.ID == id {
			me.Analyzed = true
			m = me
		}

		updated = append(updated, me)
	}

	c.setData(updated)

	err = c.Store(r)

	if err != nil {
		return m, err
	}

	if m.ID == 0 {
		return m, errNoMenuFound
	}

	return m, nil
}
