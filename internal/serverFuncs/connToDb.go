package serverfuncs

import (
	dbutils "back-end/pkg/db/dbUtils"
	"back-end/pkg/structs"
	"database/sql"
	"fmt"
)

func NewConnToDb(cfg *structs.Config) (*dbutils.DiseasePredictionDb, error) {
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		cfg.Db.Host,
		cfg.Db.Port,
		cfg.Db.User,
		cfg.Db.Password,
		cfg.Db.DbName)

	db, err := sql.Open("postgres", connStr)
	return &dbutils.DiseasePredictionDb{Db: db}, err
}
