package dbutils

import "database/sql"

func (d *DiseasePredictionDb) GetUserProfile(userId int) *sql.Row {
	row := d.Db.QueryRow(getUserProfileQuery, userId)
	return row
}
