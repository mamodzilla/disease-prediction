package dbutils

import (
	"database/sql"
	"log"
)

func (d *DiseasePredictionDb) GetUserDiagnoseList(userId int) (*sql.Rows, error) {
	rows, err := d.Db.Query(getUserDiagnoseListQuery, userId)
	if err != nil {
		return nil, err
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Println(err)
		}
	}()

	return rows, nil
}
