package structs

type UserRegister struct {
	FirstName string
	LastName  string
	Email     string
	Password  string
}

type UserLogin struct {
	Email    string
	Password string
}
