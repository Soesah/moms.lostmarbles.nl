package httpext

// ContextKey is used for middleware context
type ContextKey string

const (
	GuestContextKey   ContextKey = "guest"
	CookContextKey    ContextKey = "cook"
	ChefContextKey    ContextKey = "chef"
	AdminContextKey   ContextKey = "admin"
	SessionContextKey ContextKey = "session"
)
