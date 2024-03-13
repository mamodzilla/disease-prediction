package serverhandlers

import (
	dbutils "back-end/pkg/db/dbUtils"
	"back-end/pkg/structs"
)

type Server struct {
	AppDb *dbutils.DiseasePredictionDb
	Cfg   *structs.Config
}

type AccountHandler struct {
	Server *Server
}
