package serverhandlers

import dbutils "back-end/pkg/db/dbUtils"

func NewServer(db *dbutils.DiseasePredictionDb) *Server {
	return &Server{Db: db}
}

func (s *Server) NewAccountHandler() *AccountHandler {
	return &AccountHandler{Server: s}
}
