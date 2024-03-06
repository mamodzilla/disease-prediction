package structs

type UserRegister struct {
	Nickname string
	Email    string
	Password string
}

type UserLogin struct {
	Email    string
	Password string
}
