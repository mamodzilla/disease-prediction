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

	server := serverhandlers.NewServer(db)
	accountHandler := server.NewAccountHandler()

	r := mux.NewRouter()

	account := r.PathPrefix("/account").Subrouter()
	{
		account.HandleFunc("/register", accountHandler.Register).Methods("POST")
	}

	serverfuncs.Run(cfg, r)
}
