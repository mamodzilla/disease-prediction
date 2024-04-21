package dbutils

import "database/sql"

func (d *DiseasePredictionDb) GetQuestions(diseaseId uint) *sql.Row {
	row := d.Db.QueryRow(getDiseaseQuestionsQuery, diseaseId)
	return row
}
