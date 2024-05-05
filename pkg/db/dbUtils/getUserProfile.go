package dbutils

import "database/sql"

func (d *DiseasePredictionDb) GetUserProfile(userId int) *sql.Row {
	return d.Db.QueryRow(getUserProfileQuery, userId)
}
