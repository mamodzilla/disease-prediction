package dbutils

import (
	"back-end/internal/pkg/structs"
	"back-end/internal/utils"
	"database/sql"
	"time"
)

func (d *DiseasePredictionDb) CreateUser(userData structs.UserRegister) error {
	hashedPassword, err := utils.HashPassword(userData.Password)
	if err != nil {
		return err
	}

	var userId int
	err = d.Db.QueryRow(createUserQuery, userData.Nickname, userData.Email, hashedPassword).Scan(&userId)
	if err != nil {
		return err
	}

	err = d.CreateUserProfile(userId)
	if err != nil {
		return err
	}

	return nil
}

func (d *DiseasePredictionDb) CreateUserProfile(userId int) error {
	_, err := d.Db.Exec(createUserProfileQuery, userId, nil, nil, nil, nil, nil, nil)
	if err != nil {
		return err
	}
	return nil
}

func (d *DiseasePredictionDb) AddRefreshToken(userId int, refreshToken string, expirationTime int) error {
	_, err := d.Db.Exec(addRefreshTokenQuery, userId, refreshToken, expirationTime)
	if err != nil {
		return err
	}

	return nil
}

func (d *DiseasePredictionDb) NoteDiagnose(userId int) (int, error) {
	startDate := time.Now().Format("2006-01-02")

	var (
		diagnoseId          int
		numberUserDiagnoses int
	)
	err := d.Db.QueryRow(getUserDiagnoseNumberQuery, userId).Scan(&numberUserDiagnoses)
	if err != nil && err != sql.ErrNoRows {
		return -1, err
	}

	err = d.Db.QueryRow(noteDiagnoseQuery, userId, numberUserDiagnoses+1, startDate).Scan(&diagnoseId)
	if err != nil {
		return -1, err
	}
	return diagnoseId, nil
}

func (d *DiseasePredictionDb) NoteDiagnoseData(diagnoseId int, symptomText string, diseaseName string, diseaseDescription string) error {
	_, err := d.Db.Exec(noteDiagnoseDataQuery, diagnoseId, symptomText, diseaseName, diseaseDescription)
	if err != nil {
		return err
	}
	return nil
}
