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

type UpdateUserProfileRequest struct {
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

type DiagnoseRequest struct {
	SymptomText string `json:"symptom_text"`
}

type DiagnoseResponse struct {
	DiseaseName        string `json:"disease_name"`
	DiseaseDescription string `json:"disease_description"`
}

type DiagnoseItemResponse struct {
	UserDiagnoseId int    `json:"user_diagnose_id"`
	DiseaseName    string `json:"disease_name"`
	StartDate      string `json:"start_date"`
	EndDate        string `json:"end_date"`
}

type DiagnoseDataResponse struct {
	SymptomText        string `json:"symptom_text"`
	DiseaseName        string `json:"disease_name"`
	DiseaseDescription string `json:"disease_description"`
}

type StatisticsResponse struct {
	NumberRecordedDiseases       int `json:"number_recorded_diseases"`
	NumberAnnualRecordedDiseases int `json:"number_annual_recorded_diseases"`
}

type EndDateRequest struct {
	UserDiagnoseId int    `json:"user_diagnose_id"`
	EndDate        string `json:"end_date"`
}
