package menu

import (
	"encoding/json"
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api/menu/models"
	"github.com/Soesah/moms.lostmarbles.nl/api/storage"
)

var (
// errNoMenuListToSave = errors.New("No category menu to be saved")
)

// ParsedController is used to save and load MenuData
type ParsedController struct {
	Menus []models.ParsedMenu
}

// Load is used to load a recipe menu
func (c *ParsedController) Load(r *http.Request) error {
	var menus []models.ParsedMenu

	data, err := storage.GetFile("parsed-menus", r)

	if err != nil {
		return err
	}

	err = json.Unmarshal(data, &menus)

	if err != nil {
		return err
	}

	c.setData(menus)

	return nil
}

// setData is used to start the controller
func (c *ParsedController) setData(data []models.ParsedMenu) {
	c.Menus = data

}

// Store is used to store a category menu
func (c *ParsedController) Store(r *http.Request) error {

	menuData := c.Menus

	data, err := json.MarshalIndent(menuData, "", "  ")

	if err != nil {
		return err
	}

	err = storage.PutFile("parsed-menus", data, r)

	if err != nil {
		return err
	}

	return nil
}
