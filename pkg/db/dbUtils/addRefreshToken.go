package dbutils

func (d *DiseasePredictionDb) AddRefreshToken(userId int, refreshToken string, expirationTime int) error {
	_, err := d.Db.Exec(addRefreshTokenQuery, userId, refreshToken, expirationTime)
	if err != nil {
		return err
	}

	return nil
}
