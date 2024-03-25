package dbutils

import (
	"time"
)

func (d *DiseasePredictionDb) CheckRefreshToken(refreshToken string) (int, bool, bool, error) {
	var userId int
	var isAdmin bool
	var expirationTime int64
	err := d.Db.QueryRow(checkRefreshTokenQuery, refreshToken).Scan(&userId, &isAdmin, &expirationTime)
	if err != nil {
		return -1, false, false, err
	}

	if expirationTime > time.Now().Unix() {
		return -1, isAdmin, true, nil
	}
	return userId, isAdmin, false, nil
}
