package api

import (
	"golang.org/x/net/context"
	"google.golang.org/appengine/datastore"
)

const (
	// MomsKind is the super ancestor of all items
	MomsKind = "Moms"

	// MomsUserKind is the used for Users
	MomsUserKind = "MomsUser"

	// MomsCategoryKind is used for Categories
	MomsCategoryKind = "MomsCategory"

	// RecipeKind is used for Recipes
	RecipeKind = "MomsRecipe"

	// IngredientKind is used for Ingredients
	IngredientKind = "MomsIngredient"

	// ChangeLogKind is used for Recipes
	ChangeLogKind = "MomsChangeLog"
)

// MomsKey returns a key for Moms
func MomsKey(ctx context.Context) *datastore.Key {
	return datastore.NewKey(ctx, MomsKind, "moms.lostmarbles", 0, nil)
}

// UserKey returns a key for UserKey -> MomsKey
func UserKey(ctx context.Context, ID int64) *datastore.Key {
	return datastore.NewKey(ctx, MomsUserKind, "", ID, MomsKey(ctx))
}

// CategoryKey returns a key for CategoryKey -> MomsKey
func CategoryKey(ctx context.Context, ID int64) *datastore.Key {
	return datastore.NewKey(ctx, MomsCategoryKind, "", ID, MomsKey(ctx))
}

// RecipeKey returns a key for Recipe -> CategoryKey -> MomsKey
func RecipeKey(ctx context.Context, ID int64, CategoryID int64) *datastore.Key {
	return datastore.NewKey(ctx, RecipeKind, "", ID, CategoryKey(ctx, CategoryID))
}

// IngredientKey returns a key for Ingredient -> Recipe -> CategoryKey -> MomsKey
func IngredientKey(ctx context.Context, name string, RecipeID int64, CategoryID int64) *datastore.Key {
	return datastore.NewKey(ctx, IngredientKind, name, 0, RecipeKey(ctx, RecipeID, CategoryID))
}

// RecipeChangeKey returns a key for RecipeChangeKey -> MomsKey
func RecipeChangeKey(ctx context.Context, ID int64) *datastore.Key {
	return datastore.NewKey(ctx, RecipeKind, "", ID, MomsKey(ctx))
}

// ChangeLogKey returns a key for ChangeLog -> RecipeChangeKey -> MomsKey
func ChangeLogKey(ctx context.Context, ID int64, recipeID int64) *datastore.Key {
	return datastore.NewKey(ctx, ChangeLogKind, "", ID, RecipeChangeKey(ctx, recipeID))
}
