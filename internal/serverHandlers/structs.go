package serverhandlers

import (
	dbutils "back-end/internal/pkg/db/dbUtils"
	"back-end/internal/pkg/structs"
)

type Server struct {
	AppDb *dbutils.DiseasePredictionDb
	Cfg   *structs.Config
}

type CommonHandler struct {
	Server *Server
}

type AccountHandler struct {
	Server *Server
}

type UserHandler struct {
	Server *Server
}
