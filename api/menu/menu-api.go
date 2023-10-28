package menu

import (
	"errors"
	"net/http"

	"github.com/Soesah/moms.lostmarbles.nl/api/menu/models"
)

var errIngredientNotFound = errors.New("ingredient not found")
var errMealNotFound = errors.New("meal not found")
var errMenuNotFound = errors.New("menu not found")

func GetIngredients(r *http.Request) ([]models.Ingredient, error) {
	var ings []models.Ingredient

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return ings, err
	}

	return c.Ingredients, nil
}

func CreateIngredient(data models.Ingredient, r *http.Request) (models.Ingredient, error) {
	var i models.Ingredient

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return i, err
	}

	data.ID = c.GetNewIngredientID()
	c.Ingredients = append(c.Ingredients, data)

	err = c.Store(r)

	if err != nil {
		return i, err
	}

	return i, nil
}

func UpdateIngredient(data models.Ingredient, r *http.Request) (models.Ingredient, error) {
	var i models.Ingredient

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return i, err
	}

	ingredients := make([]models.Ingredient, 0)
	found := false

	for _, ingr := range c.Ingredients {
		if ingr.ID == data.ID {
			ingredients = append(ingredients, data)
			found = true
		} else {
			ingredients = append(ingredients, ingr)
		}
	}

	if !found {
		return i, errIngredientNotFound
	}

	c.Ingredients = ingredients

	err = c.Store(r)

	if err != nil {
		return i, err
	}

	return i, nil
}

func RemoveIngredient(id int64, r *http.Request) error {

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return err
	}

	ingredients := make([]models.Ingredient, 0)
	found := false

	for _, ingr := range c.Ingredients {
		if ingr.ID == id {
			// do not save the ingredient
			found = true
		} else {
			ingredients = append(ingredients, ingr)
		}
	}

	if !found {
		return errIngredientNotFound
	}

	c.Ingredients = ingredients

	err = c.Store(r)

	if err != nil {
		return err
	}

	return nil
}

func GetMeals(r *http.Request) ([]models.Meal, error) {
	var meals []models.Meal

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return meals, err
	}

	return c.Meals, nil
}

func CreateMeal(data models.Meal, r *http.Request) (models.Meal, error) {
	var m models.Meal

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return m, err
	}

	data.ID = c.GetNewMealID()
	c.Meals = append(c.Meals, data)

	err = c.Store(r)

	if err != nil {
		return m, err
	}

	return m, nil
}

func UpdateMeal(data models.Meal, r *http.Request) (models.Meal, error) {
	var m models.Meal

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return m, err
	}

	meals := make([]models.Meal, 0)
	found := false

	for _, me := range c.Meals {
		if me.ID == data.ID {
			meals = append(meals, data)
			found = true
		} else {
			meals = append(meals, me)
		}
	}

	if !found {
		return m, errMealNotFound
	}

	c.Meals = meals

	err = c.Store(r)

	if err != nil {
		return m, err
	}

	return m, nil
}

func RemoveMeal(id int64, r *http.Request) error {

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return err
	}

	meals := make([]models.Meal, 0)
	found := false

	for _, me := range c.Meals {
		if me.ID == id {
			// do not save the meal
			found = true
		} else {
			meals = append(meals, me)
		}
	}

	if !found {
		return errMealNotFound
	}

	c.Meals = meals

	err = c.Store(r)

	if err != nil {
		return err
	}

	return nil
}

func CreateMenu(data models.Menu, r *http.Request) (models.Menu, error) {

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return data, err
	}

	data.ID = c.GetNewMenuID()
	c.Menus = append(c.Menus, data)

	err = c.Store(r)

	if err != nil {
		return data, err
	}

	return data, nil
}

func UpdateMenu(data models.Menu, r *http.Request) (models.Menu, error) {

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return data, err
	}

	menus := make([]models.Menu, 0)
	found := false

	for _, men := range c.Menus {
		if men.ID == data.ID {
			menus = append(menus, data)
			found = true
		} else {
			menus = append(menus, men)
		}
	}

	if !found {
		return data, errMenuNotFound
	}

	c.Menus = menus

	err = c.Store(r)

	if err != nil {
		return data, err
	}

	return data, nil
}

func RemoveMenu(id int64, r *http.Request) error {

	c := Controller{}
	err := c.Load(r)

	if err != nil {
		return err
	}

	menus := make([]models.Menu, 0)
	found := false

	for _, ingr := range c.Menus {
		if ingr.ID == id {
			// do not save the menu
			found = true
		} else {
			menus = append(menus, ingr)
		}
	}

	if !found {
		return errMenuNotFound
	}

	c.Menus = menus

	err = c.Store(r)

	if err != nil {
		return err
	}

	return nil
}
