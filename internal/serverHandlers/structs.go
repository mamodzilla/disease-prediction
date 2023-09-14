package serverhandlers

import dbutils "back-end/pkg/db/dbUtils"

type Server struct {
	Db *dbutils.DiseasePredictionDb
}

type AccountHandler struct {
	Server *Server
}
