package main

import (
	"back-end/configs"
	serverfuncs "back-end/internal/serverFuncs"
	serverhandlers "back-end/internal/serverHandlers"
	"log"

	"github.com/gorilla/mux"
)

func main() {
	cfg := configs.NewConfig()

	db, err := serverfuncs.NewConnToDb(cfg)
	if err != nil {
		log.Fatal("Error: failed to connect to the database")
	}

	server := serverhandlers.NewServer(db, cfg)
	accountHandler := server.NewAccountHandler()

	r := mux.NewRouter()

	r.HandleFunc("/register", accountHandler.Register).Methods("POST")
	r.HandleFunc("/login", accountHandler.Login).Methods("POST")
	r.HandleFunc("/refreshTokens", accountHandler.RefreshTokens).Methods("POST")

	serverfuncs.Run(cfg, r)
}
