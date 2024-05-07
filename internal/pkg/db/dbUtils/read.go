package dbutils

import (
	"database/sql"
	"log"
	"time"
)

type Diagnose struct {
	StartDate string
}

func (d *DiseasePredictionDb) GetUserProfile(userId int) *sql.Row {
	return d.Db.QueryRow(getUserProfileQuery, userId)
}

func (d *DiseasePredictionDb) GetUserDiagnoseList(userId int) (*sql.Rows, error) {
	rows, err := d.Db.Query(getUserDiagnoseListQuery, userId)
	if err != nil {
		return nil, err
	}

	return rows, nil
}

func (d *DiseasePredictionDb) GetUserDiagnoseData(userDiagnoseId int, userId int) *sql.Row {
	return d.Db.QueryRow(getUserDiagnoseData, userDiagnoseId, userId)
}

func (d *DiseasePredictionDb) GetNumberRecordedDiseases(userId int) *sql.Row {
	return d.Db.QueryRow(getUserDiagnoseNumberQuery, userId)
}

func (d *DiseasePredictionDb) GetNumberAnnualRecordedDiseases(userId int) (int, error) {
	rows, err := d.Db.Query(getUserDiagnoseStartDates, userId)
	if err != nil {
		return -1, err
	}

	year := time.Now().Year()
	numberAnnualRecordedDiseases := 0
	for rows.Next() {
		d := Diagnose{}
		err := rows.Scan(&d.StartDate)
		if err != nil {
			log.Println(err)
			continue
		}

		parsedDate, err := time.Parse("2006-01-02", d.StartDate)
		if err != nil {
			return -1, err
		}

		if year == parsedDate.Year() {
			numberAnnualRecordedDiseases++
		}
	}

	return numberAnnualRecordedDiseases, nil
}

func (d *DiseasePredictionDb) CheckRefreshToken(refreshToken string) (int, bool, bool, error) {
	var userId int
	var isAdmin bool
	var expirationTime int64
	err := d.Db.QueryRow(checkRefreshTokenQuery, refreshToken).Scan(&userId, &isAdmin, &expirationTime)
	if err != nil {
		return -1, false, false, err
	}

	if expirationTime < time.Now().Unix() {
		return -1, isAdmin, false, nil
	}
	return userId, isAdmin, true, nil
}
