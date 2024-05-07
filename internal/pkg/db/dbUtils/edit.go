package dbutils

import (
	"back-end/internal/pkg/structs"
	"back-end/internal/utils"
	"database/sql"
)

func (d *DiseasePredictionDb) UpdateUserProfile(userId int, data structs.UpdateUserProfileRequest) error {
	hashedPassword, err := utils.HashPassword(data.Password)
	if err != nil {
		return err
	}

	_, err = d.Db.Exec(updateUserDataQuery, data.Nickname, data.Email, hashedPassword, userId)
	if err != nil {
		return err
	}

	_, err = d.Db.Exec(updateUserProfileQuery, data.BirthDate, data.Gender, data.MaritalStatus, data.HavingChildren, data.Job, data.Location, userId)
	if err != nil {
		return err
	}

	return nil
}

func (d *DiseasePredictionDb) UpdateDiagnoseEndDate(userId int, userDiagnoseId int, endDate string) (sql.Result, error) {
	sqlRes, err := d.Db.Exec(updateDiagnoseEndDateQuery, endDate, userId, userDiagnoseId)
	if err != nil {
		return nil, err
	}

	return sqlRes, nil
}
