package serverhandlers

import (
	dbutils "back-end/internal/pkg/db/dbUtils"
	"back-end/internal/pkg/structs"
)

func NewServer(db *dbutils.DiseasePredictionDb, cfg *structs.Config) *Server {
	return &Server{AppDb: db, Cfg: cfg}
}

func (s *Server) NewCommonHandler() *CommonHandler {
	return &CommonHandler{Server: s}
}

func (s *Server) NewAccountHandler() *AccountHandler {
	return &AccountHandler{Server: s}
}

func (s *Server) NewUserHandler() *UserHandler {
	return &UserHandler{Server: s}
}
