package util

func ContainsInt(s int64, list []int64) bool {
	contains := false

	for i := 0; i < len(list); i++ {
		if list[i] == s {
			contains = true
		}
	}

	return contains
}
