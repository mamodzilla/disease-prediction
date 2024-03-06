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

	_, err = d.Db.Exec(createUserQuery, userData.Nickname, userData.Email, hashedPassword)
	if err != nil {
		return err
	}
	return nil
}
