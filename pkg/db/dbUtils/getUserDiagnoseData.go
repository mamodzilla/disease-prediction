package dbutils

import "database/sql"

func (d *DiseasePredictionDb) GetUserDiagnoseData(diagnoseId int, userId int) *sql.Row {
	return d.Db.QueryRow(getUserDiagnoseData, diagnoseId, userId)
}
