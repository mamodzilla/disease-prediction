package serverhandlers

import (
	dbutils "back-end/pkg/db/dbUtils"
	"back-end/pkg/structs"
)

func NewServer(db *dbutils.DiseasePredictionDb, cfg *structs.Config) *Server {
	return &Server{AppDb: db, Cfg: cfg}
}

func (s *Server) NewAccountHandler() *AccountHandler {
	return &AccountHandler{Server: s}
}
