package structs

import "database/sql"

type UserProfileRawResponse struct {
	Nickname       string         `json:"nickname"`
	Email          string         `json:"email"`
	Password       string         `json:"password"`
	BirthDate      sql.NullString `json:"birth_date"`
	Gender         sql.NullString `json:"gender"`
	MaritalStatus  sql.NullString `json:"marital_status"`
	HavingChildren sql.NullBool   `json:"having_children"`
	Job            sql.NullString `json:"job"`
	Location       sql.NullString `json:"location"`
}

type UserProfileResponse struct {
	Nickname       string `json:"nickname"`
	Email          string `json:"email"`
	Password       string `json:"password"`
	BirthDate      string `json:"birth_date"`
	Gender         string `json:"gender"`
	MaritalStatus  string `json:"marital_status"`
	HavingChildren bool   `json:"having_children"`
	Job            string `json:"job"`
	Location       string `json:"location"`
}

type ChangePassword struct {
	OldPassword string
	NewPassword string
}
