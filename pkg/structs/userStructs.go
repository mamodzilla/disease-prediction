package structs

type UserProfile struct {
	FirstName      string
	LastName       string
	Email          string
	Gender         string
	Age            int
	Job            string
	MaritalStatus  bool
	HavingChildren bool
	Password       string
}

type AdditionalInformation struct {
	Gender         string
	Age            int
	Job            string
	MaritalStatus  bool
	HavingChildren bool
}

type ChangePassword struct {
	OldPassword string
	NewPassword string
}
