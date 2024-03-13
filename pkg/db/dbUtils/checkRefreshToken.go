package dbutils

import (
	"time"
)

func (d *DiseasePredictionDb) CheckRefreshToken(refreshToken string) (int, string, bool, error) {
	var userId int
	var nickname string
	var expirationTime int64
	err := d.Db.QueryRow(checkRefreshTokenQuery, refreshToken).Scan(&userId, &nickname, &expirationTime)
	if err != nil {
		return -1, "", false, err
	}

	if expirationTime > time.Now().Unix() {
		return -1, "", true, nil
	}
	return userId, nickname, false, nil
}