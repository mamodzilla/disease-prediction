package main

import (
	"back-end/configs"
	serverfuncs "back-end/internal/serverFuncs"
	serverhandlers "back-end/internal/serverHandlers"
	"log"

	"github.com/gorilla/mux"
)

func main() {
	path := "../../configs/config.yml"
	cfg, err := configs.NewConfig(path)
	if err != nil {
		log.Fatal(err)
	}

	server := serverhandlers.NewServer()
	accountHandler := server.NewAccountHandler()

	r := mux.NewRouter()

	account := r.PathPrefix("/account").Subrouter()
	{
		account.HandleFunc("/register", accountHandler.Register).Methods("POST")
	}

	serverfuncs.Run(cfg, r)
}
