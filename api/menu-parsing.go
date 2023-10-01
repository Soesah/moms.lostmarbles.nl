package main

import (
	"encoding/json"
	"io"
	"log"
	"math"
	"mime/quotedprintable"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/Soesah/moms.lostmarbles.nl/api/menu/models"
)

var DateFormat = "Mon, 2 Jan 2006 15:04:05 -0700"

func main() {

	files, err := filepath.Glob("./menu-emails/**/*.eml")
	// files, err := filepath.Glob("./menu-emails/2023/Menu week 39.eml")

	if err != nil {
		log.Fatal(err)
	}

	var menus []models.ParsedMenu

	for i := 0; i < len(files); i++ {
		file := files[i]

		bytes, err := os.ReadFile(file)

		if err != nil {
			log.Fatal(err)
		}

		contents := string(bytes)

		data := emailToMenu(contents, file, i)

		menus = append(menus, data)
	}

	log.Printf("%v menus parsed", len(menus))

	jsonData, err := json.Marshal(menus)
	if err != nil {
		log.Fatal(err)
	}

	for i := 0; i < len(menus); i++ {
		m := menus[i]
		if !m.IsValid() {
			log.Printf("%v does not produce a valid menu", m.File)
		}

	}

	os.WriteFile("./data/parsed-menus.json", jsonData, 0644)
}

func getParams(regEx, data string) (paramsMap map[string]string) {

	var compRegEx = regexp.MustCompile(regEx)
	match := compRegEx.FindStringSubmatch(data)

	paramsMap = make(map[string]string)
	for i, name := range compRegEx.SubexpNames() {
		if i > 0 && i <= len(match) {
			paramsMap[name] = match[i]
		}
	}
	return paramsMap
}

func findSaturday(d time.Time) time.Time {

	if d.Weekday() == time.Friday {
		return d.AddDate(0, 0, 1)
	}

	if d.Weekday() == time.Sunday {
		return d.AddDate(0, 0, -1)
	}

	if d.Weekday() == time.Monday {
		return d.AddDate(0, 0, -2)
	}

	return d
}

func cleanLine(str string) string {
	str = strings.TrimSpace(str)
	b, _ := io.ReadAll(quotedprintable.NewReader(strings.NewReader(str)))
	str = string(b)

	return str
}

func getMeal(s string, nextLines ...string) string {
	urlRe := regexp.MustCompile(`<(?P<url>https?://.+)>`)
	isDayRe := regexp.MustCompile(`Zaterdag|Saturday|Sat|Zondag|Sunday|Sun|Maandag|Monday|Mon|Dinsdag|Tuesday|Tue|Woensdag|Wednesday|Wed|Donderdag|Thursday|Thu|Vrijdag|Friday|Fri`)

	s = urlRe.ReplaceAllString(s, "")

	// add more lines
	i := 0
	for i < len(nextLines) {
		line := cleanLine(nextLines[i])

		// drop out when matching another day, or empty line
		if isDayRe.MatchString(line) || line == "" {
			break
		}
		s = strings.Join([]string{s, line}, " ")
		i++
	}

	return strings.TrimSpace(urlRe.ReplaceAllString(s, ""))
}

func getUrls(lines ...string) []string {
	urls := make([]string, 0)
	isDayRe := regexp.MustCompile(`Zaterdag|Saturday|Sat|Zondag|Sunday|Sun|Maandag|Monday|Mon|Dinsdag|Tuesday|Tue|Woensdag|Wednesday|Wed|Donderdag|Thursday|Thu|Vrijdag|Friday|Fri`)
	i := 0
	for i < len(lines) {
		line := lines[i]

		// drop out when matching another day, or empty line
		if isDayRe.MatchString(line) || line == "" {
			break
		}
		m := getParams(`<(?P<url>https?://.+)>`, line)
		if m["url"] != "" {
			urls = append(urls, m["url"])
		}

		i++
	}

	return urls
}

func parseIngredient(s string) (string, string, bool) {
	optionalRe := regexp.MustCompile(`\?`)
	notesReplaceRe := regexp.MustCompile(`\s(\(.+\))`)
	m := getParams(`(\s+-\s)?(?P<ingredient>.+)`, s)
	m1 := getParams(`(\((?P<notes>.+)\))`, s)

	ingredient := strings.Replace(m["ingredient"], "- ", "", 1)
	ingredient = strings.TrimSpace((strings.Replace(ingredient, "?", "", 1)))
	notes := strings.TrimSpace((m1["notes"]))

	if notes != "" {
		ingredient = notesReplaceRe.ReplaceAllString(ingredient, "")
	}

	return ingredient, notes, optionalRe.MatchString(s)
}

func emailToMenu(email string, file string, id int) models.ParsedMenu {

	var menu models.ParsedMenu

	menu.ID = id + 1
	menu.File = file
	menu.Ingredients = make([]models.ParsedIngredient, 0)

	lines := strings.Split(email, "\n")

	dateRe := regexp.MustCompile(`(Date:\s)(.+)`)
	subjectRe := regexp.MustCompile(`(Subject:\s)(.+)`)
	leftOverRe := regexp.MustCompile(`(left\s?overs?)`)
	ingredientHeaderRe := regexp.MustCompile(`(Shopping:|Things to buy:|Shopping|Te kopen:|Kopen|Te kopen|Todo|Boodschappen)`)
	boundaryRe := regexp.MustCompile(`boundary=(?P<boundary>.+)`)

	var dateIndex int
	var subjectIndex int
	var ingredientHeaderIndex int
	var boundary string
	var startBoundaryIndex int
	var endBoundaryIndex int

	// filter lines, find indexes of certain lines
	for i := 0; i < len(lines); i++ {
		line := lines[i]
		line = strings.TrimSpace(line)

		if dateRe.MatchString(line) {
			dateIndex = i
		}

		if subjectRe.MatchString(line) {
			subjectIndex = i
		}

		if ingredientHeaderRe.MatchString(line) && ingredientHeaderIndex == 0 {
			ingredientHeaderIndex = i
		}

		if boundaryRe.MatchString(line) {
			m := getParams(`boundary="?(?P<boundary>.+)"?`, line)
			boundary = strings.Replace(strings.Join([]string{"--", m["boundary"]}, ""), `"`, "", 1)
		}

		if startBoundaryIndex == 0 && line == boundary {
			startBoundaryIndex = i
		} else if startBoundaryIndex != 0 && endBoundaryIndex == 0 && line == boundary {
			endBoundaryIndex = i
		}
	}

	start := math.Min(float64(subjectIndex), float64(dateIndex))

	if endBoundaryIndex == 0 {
		log.Printf("Cannot find end boundary for %v (using %v)", file, boundary)
	}

	ingredientHeaderIndex = ingredientHeaderIndex - int(start)

	var sendDate time.Time
	var fridayIndex int

	parsableLines := lines[int(start) : endBoundaryIndex-1]

	for i := 0; i < len(parsableLines); i++ {
		line := parsableLines[i]
		nextLines := parsableLines[i+1:]
		line = cleanLine(line)

		// Parse the date
		if dateRe.MatchString(line) {
			m := getParams(`(Date:\s)(?P<date>.+)`, line)
			t, err := time.Parse(DateFormat, m["date"])
			if err != nil {
				log.Printf("Failed to parse date on %v: %v", menu.File, err.Error())
			}
			menu.Date = t
			sendDate = t
		}

		// Parse the date
		if subjectRe.MatchString(line) {
			m := getParams(`(Subject:\s)(?P<subject>.+)`, line)
			menu.Subject = m["subject"]
		}

		weekStartDate := findSaturday(sendDate)

		htmlRe := regexp.MustCompile(`(\<div|\<li)`)

		// Parse Saturday
		satRe := regexp.MustCompile(`(Zaterdag|Saturday|Sat)\s?:`)
		if satRe.MatchString(line) && !htmlRe.MatchString(line) {
			m := getParams(`:(\s?|\s+)(?P<meal>.+)`, line)
			menu.Saturday = models.ParsedMenuDay{
				Meal:      getMeal(m["meal"], nextLines...),
				Urls:      getUrls(nextLines...),
				Date:      weekStartDate,
				LeftOvers: leftOverRe.MatchString(line),
			}
		}
		// Parse Sunday
		weekStartDate = weekStartDate.AddDate(0, 0, 1)
		sunRe := regexp.MustCompile(`(Zondag|Sunday|Sun)\s?:`)
		if sunRe.MatchString(line) && !htmlRe.MatchString(line) {
			m := getParams(`:(\s?|\s+)(?P<meal>.+)`, line)
			menu.Sunday = models.ParsedMenuDay{
				Meal:      getMeal(m["meal"], nextLines...),
				Urls:      getUrls(nextLines...),
				Date:      weekStartDate,
				LeftOvers: leftOverRe.MatchString(line),
			}
		}
		// Parse Monday
		weekStartDate = weekStartDate.AddDate(0, 0, 1)
		monRe := regexp.MustCompile(`(Maandag|Monday|Mon)\s?:`)
		if monRe.MatchString(line) && !htmlRe.MatchString(line) {
			m := getParams(`:(\s?|\s+)(?P<meal>.+)`, line)
			menu.Monday = models.ParsedMenuDay{
				Meal:      getMeal(m["meal"], nextLines...),
				Urls:      getUrls(nextLines...),
				Date:      weekStartDate,
				LeftOvers: leftOverRe.MatchString(line),
			}
		}

		// set the year and week
		menu.Year, menu.Week = weekStartDate.ISOWeek()

		// Parse Tuesday
		weekStartDate = weekStartDate.AddDate(0, 0, 1)
		tueRe := regexp.MustCompile(`(Dinsdag|Tuesday|Tue)\s?:`)
		if tueRe.MatchString(line) && !htmlRe.MatchString(line) {
			m := getParams(`:(\s?|\s+)(?P<meal>.+)`, line)
			menu.Tuesday = models.ParsedMenuDay{
				Meal:      getMeal(m["meal"], nextLines...),
				Urls:      getUrls(nextLines...),
				Date:      weekStartDate,
				LeftOvers: leftOverRe.MatchString(line),
			}
		}
		// Parse Wednesday
		weekStartDate = weekStartDate.AddDate(0, 0, 1)
		wedRe := regexp.MustCompile(`(Woensdag|Wednesday|Wed)\s?:`)
		if wedRe.MatchString(line) && !htmlRe.MatchString(line) {
			m := getParams(`:(\s?|\s+)(?P<meal>.+)`, line)
			menu.Wednesday = models.ParsedMenuDay{
				Meal:      getMeal(m["meal"], nextLines...),
				Urls:      getUrls(nextLines...),
				Date:      weekStartDate,
				LeftOvers: leftOverRe.MatchString(line),
			}
		}
		// Parse Thursday
		weekStartDate = weekStartDate.AddDate(0, 0, 1)
		thuRe := regexp.MustCompile(`(Donderdag|Thursday|Thu)\s?:`)
		if thuRe.MatchString(line) && !htmlRe.MatchString(line) {
			m := getParams(`:(\s?|\s+)(?P<meal>.+)`, line)
			menu.Thursday = models.ParsedMenuDay{
				Meal:      getMeal(m["meal"], nextLines...),
				Urls:      getUrls(nextLines...),
				Date:      weekStartDate,
				LeftOvers: leftOverRe.MatchString(line),
			}
		}
		// Parse Friday
		weekStartDate = weekStartDate.AddDate(0, 0, 1)
		friRe := regexp.MustCompile(`(Vrijdag|Friday|Fri)\s?:`)
		if friRe.MatchString(line) && !htmlRe.MatchString(line) {
			m := getParams(`:(\s?|\s+)(?P<meal>.+)`, line)
			menu.Friday = models.ParsedMenuDay{
				Meal:      getMeal(m["meal"], nextLines...),
				Urls:      getUrls(nextLines...),
				Date:      weekStartDate,
				LeftOvers: leftOverRe.MatchString(line),
			}
			fridayIndex = i + int(start)

		}

		// ingredients should be at least after Friday
		if i > ingredientHeaderIndex && i > startBoundaryIndex && i > fridayIndex {
			ingredient, notes, optional := parseIngredient(line)

			if ingredient != "" {
				menu.Ingredients = append(menu.Ingredients, models.ParsedIngredient{
					Name:     ingredient,
					Amount:   "",
					Notes:    notes,
					Optional: optional,
				})
			}
		}
	}

	return menu
}

func Contains(s string, list []string) bool {
	contains := false

	for i := 0; i < len(list); i++ {
		if list[i] == s {
			contains = true
		}
	}

	return contains
}

func Unique(list []string) []string {
	unique := make([]string, 0)

	for i := 0; i < len(list); i++ {
		str := list[i]

		if !Contains(str, unique) {
			unique = append(unique, str)
		}

	}

	return unique
}
