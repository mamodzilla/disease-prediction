package structs

type UserProfile struct {
	Nickname string
	Email    string
	Password string
}

type UserInformation struct {
	Gender         string
	BirthDate      int
	Job            string
	MaritalStatus  string
	HavingChildren bool
}

type ChangePassword struct {
	OldPassword string
	NewPassword string
}
