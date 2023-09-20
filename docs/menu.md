# Menu

Accessible through [menu](https://moms.lostmarbles.nl/menu) (login once, non-expiring cookie detailing user-group)

## Flow

### Part 1

- Create a parser for all the emails, parse to menu, with dates and the list of ingredients.
- Analyze each recipe
  - Load one by one
  - Mark each on as analized
  - Convert meals to proper meals
  - Be able to add ingredients and check some boxes for what kind of base and type the meal has
  - Search for meal, by next word (boerenkool, mie ayam) to more quickly analyze and convert the menu's to meal reference files.
  - Refine the analysis
  - For existing meals, be able to add variations and ingredients (A variation is a meal, but with different ingredients)
  - Paste ingredients, analyze for existing ingredients (request to get possible ingredients)
- Store any new ingredients
- Store any new meals with references to ingredients
- Store the menu as collections of meal references

## Todo

- Add user groups so that multiple people see the same menu
- See this weeks menu
- Can see different weeks
- Add a form to add a menu
  - weeknumber
  - days with dishes
  - Add a form to add a dish
    - title
    - ingredients
    - check off what you do need to buy
- Fill in as much history as you can find.

## More features

- Suggest a dish while typing
- See last year same week(s)
- Show last time dish was on a menu
- Flag has-left-over type food
- Flag rice, noodles, potatoes
- Flag meat
