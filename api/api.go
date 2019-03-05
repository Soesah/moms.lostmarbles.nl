package api

import (
	"golang.org/x/net/context"
	"google.golang.org/appengine/datastore"
)

const (
	// MomsKind is the super ancestor of all items
	MomsKind = "Moms"

	// MomsCategoryKind is the ancestor of all Moms items
	MomsCategoryKind = "MomsCategory"

	// RecipeKind is used for Recipes
	RecipeKind = "Recipe"

	// IngredientKind is used for Ingredients
	IngredientKind = "Ingredient"

	// NoteKind is used for Notes
	NoteKind = "Note"

	// ChangeLogKind is used for Recipes
	ChangeLogKind = "ChangeLog"
)

// MomsKey returns a key for Moms
func MomsKey(ctx context.Context) *datastore.Key {
	return datastore.NewKey(ctx, MomsKind, "moms.lostmarbles", 0, nil)
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

// NoteKey returns a key for Note -> Recipe -> CategoryKey -> MomsKey
func NoteKey(ctx context.Context, name string, RecipeID int64, CategoryID int64) *datastore.Key {
	return datastore.NewKey(ctx, NoteKind, name, 0, RecipeKey(ctx, RecipeID, CategoryID))
}

// ChangeLogKey returns a key for ChangeLog -> MomsKey
func ChangeLogKey(ctx context.Context, ID string, CategoryID string) *datastore.Key {
	return datastore.NewKey(ctx, ChangeLogKind, ID, 0, MomsKey(ctx))
}
