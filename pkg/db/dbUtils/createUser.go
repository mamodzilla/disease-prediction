package dbutils

import (
	"back-end/internal/utils"
	"back-end/pkg/structs"
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
