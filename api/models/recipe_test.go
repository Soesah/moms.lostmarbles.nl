package models

import (
	"testing"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/api/util"
	"github.com/stretchr/testify/assert"
)

var creationDate, _ = time.Parse(util.DateTimeFormat, "2004-03-08 13:06:48")
var modificationDate, _ = time.Parse(util.DateTimeFormat, "2018-03-24 10:29:37")

var recipe = Recipe{
	ID:               21,
	CategoryID:       9,
	Name:             "Brownies",
	Slug:             "brownies",
	CreationDate:     creationDate,
	ModificationDate: modificationDate,
	XML:              "<image source=\"brownies.jpg\"/><title>Brownies</title><cook>Joy</cook><ingredients><ingredient><name>boter</name><amount>125 gram</amount><remark>zacht geroerd</remark></ingredient><ingredient><name>poedersuiker</name><amount>400 gram</amount></ingredient><ingredient><name>eieren</name><amount>4</amount></ingredient><ingredient><name>bittere chocolade</name><amount>125 gram</amount><remark>gesmolten (dat doe je door een pannetje met de chocola in een grotere pan te hangen waar je water in kookt) of in de magnetron</remark></ingredient><ingredient><name>vanillesuiker</name><amount>2 zakjes</amount></ingredient><ingredient><name>walnoten</name><amount>150 gram</amount><remark>in stukjes</remark></ingredient><ingredient><name>bloem</name><amount>200 gram</amount></ingredient></ingredients><preparation><step>Verwarm de oven voor op 160 graden. </step><step> Klop de boter en de poedersuiker samen, stuk voor stuk de eieren erdoor kloppen en dan de vanillesuiker en de chocola. </step><step>Voeg de bloem en de nootjes luchtig toe. </step><step>Beboter  of gebruik bakpapier in een ovenschaal en schep het deeg erin. </step><step>Strijk het oppervlak met een natgemaakt mes glad en doe in de oven. </step><step>De brownies zijn in 35 tot 40 minuten gaar. Bovenkant moet iets gebarsten zijn en de binnenkant niet meer vloeibaar!</step><step>Haal ze uit de oven, laat 10 minuten staan en snij in ongeveer 24 stukjes. Neem ze van de bakplaat als ze koud geworden zijn.</step></preparation><notes><note top=\"260\" left=\"720\"><paragraph>Een lagere termperatuur werkt beter met jouw oven, 100 graden ofzo. Ook kan je beter vijf eieren gebruiken.</paragraph><author>Carl</author></note><note><paragraph>Jouw oven is vrij warm, daardoor wordt het snel te droog. </paragraph><paragraph>Goed opletten!</paragraph><author id=\"1\">Carl</author></note><note><paragraph>De boter natuurlijk van tevoren uit de ijskast halen, dan is het mooi zacht als je begint.</paragraph><paragraph/><paragraph>Het natte mes werkt ook beter als je het nat maakt met heet water.</paragraph><author id=\"1\">Carl</author></note><note><paragraph>Ik heb het recept iets aangepast n.a.v.de notities van Carl jr.</paragraph><author id=\"2\">Joy</author></note></notes>",
	Servings:         "4",
	PreparationTime:  "40 minuten",
	Language:         "nl-NL",
}

var ingredients = Ingredients{
	Ingredients: []Ingredient{
		{
			Name:   "boter",
			Amount: "125 gram",
			Remark: "zacht geroerd",
		},
		{
			Name:   "poedersuiker",
			Amount: "400 gram",
		},
		{
			Name:   "eieren",
			Amount: "4",
		},
		{
			Name:   "bittere chocolade",
			Amount: "125 gram",
			Remark: "gesmolten (dat doe je door een pannetje met de chocola in een grotere pan te hangen waar je water in kookt) of in de magnetron",
		},
		{
			Name:   "vanillesuiker",
			Amount: "2 zakjes",
		},
		{
			Name:   "walnoten",
			Amount: "150 gram",
			Remark: "in stukjes",
		},
		{
			Name:   "bloem",
			Amount: "200 gram",
		},
	},
}

func TestGetXML(t *testing.T) {
	assert.Equal(t, "<recipe id=\"21\" category_id=\"9\" xml:lang=\"nl-NL\" slug=\"brownies\" name=\"Brownies\" servings=\"4\" preparation_time=\"40 minuten\" creation_date=\"2004-03-08T13:06:48.000Z\" modification_date=\"2018-03-24T10:29:37.000Z\" ><image source=\"brownies.jpg\"/><title>Brownies</title><cook>Joy</cook><ingredients><ingredient><name>boter</name><amount>125 gram</amount><remark>zacht geroerd</remark></ingredient><ingredient><name>poedersuiker</name><amount>400 gram</amount></ingredient><ingredient><name>eieren</name><amount>4</amount></ingredient><ingredient><name>bittere chocolade</name><amount>125 gram</amount><remark>gesmolten (dat doe je door een pannetje met de chocola in een grotere pan te hangen waar je water in kookt) of in de magnetron</remark></ingredient><ingredient><name>vanillesuiker</name><amount>2 zakjes</amount></ingredient><ingredient><name>walnoten</name><amount>150 gram</amount><remark>in stukjes</remark></ingredient><ingredient><name>bloem</name><amount>200 gram</amount></ingredient></ingredients><preparation><step>Verwarm de oven voor op 160 graden. </step><step> Klop de boter en de poedersuiker samen, stuk voor stuk de eieren erdoor kloppen en dan de vanillesuiker en de chocola. </step><step>Voeg de bloem en de nootjes luchtig toe. </step><step>Beboter  of gebruik bakpapier in een ovenschaal en schep het deeg erin. </step><step>Strijk het oppervlak met een natgemaakt mes glad en doe in de oven. </step><step>De brownies zijn in 35 tot 40 minuten gaar. Bovenkant moet iets gebarsten zijn en de binnenkant niet meer vloeibaar!</step><step>Haal ze uit de oven, laat 10 minuten staan en snij in ongeveer 24 stukjes. Neem ze van de bakplaat als ze koud geworden zijn.</step></preparation><notes><note top=\"260\" left=\"720\"><paragraph>Een lagere termperatuur werkt beter met jouw oven, 100 graden ofzo. Ook kan je beter vijf eieren gebruiken.</paragraph><author>Carl</author></note><note><paragraph>Jouw oven is vrij warm, daardoor wordt het snel te droog. </paragraph><paragraph>Goed opletten!</paragraph><author id=\"1\">Carl</author></note><note><paragraph>De boter natuurlijk van tevoren uit de ijskast halen, dan is het mooi zacht als je begint.</paragraph><paragraph/><paragraph>Het natte mes werkt ook beter als je het nat maakt met heet water.</paragraph><author id=\"1\">Carl</author></note><note><paragraph>Ik heb het recept iets aangepast n.a.v.de notities van Carl jr.</paragraph><author id=\"2\">Joy</author></note></notes></recipe>", recipe.GetXML())
}
func TestGetIngredients(t *testing.T) {
	ing, _ := recipe.GetIngredients()
	assert.Equal(t, ingredients.Ingredients[0].Name, ing[0].Name)
	assert.Equal(t, ingredients.Ingredients[0].Amount, ing[0].Amount)
	assert.Equal(t, ingredients.Ingredients[0].Remark, ing[0].Remark)
	assert.Equal(t, ingredients.Ingredients[1].Name, ing[1].Name)
	assert.Equal(t, ingredients.Ingredients[2].Name, ing[2].Name)
	assert.Equal(t, ingredients.Ingredients[3].Name, ing[3].Name)
	assert.Equal(t, ingredients.Ingredients[4].Name, ing[4].Name)
	assert.Equal(t, ingredients.Ingredients[5].Name, ing[5].Name)
	assert.Equal(t, ingredients.Ingredients[6].Name, ing[6].Name)
	assert.Equal(t, ingredients.Ingredients[6].Amount, ing[6].Amount)
}
