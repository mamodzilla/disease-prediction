package main

import (
	"back-end/configs"
	middlewares "back-end/internal/middlewares"
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
	commonHandler := server.NewCommonHandler()
	accountHandler := server.NewAccountHandler()
	userHandler := server.NewUserHandler()

	authMiddleware := middlewares.AuthMiddlewareWrapper(cfg)

	r := mux.NewRouter()

	r.HandleFunc("/diagnose", commonHandler.Diagnose).Methods("POST")

	r.HandleFunc("/register", accountHandler.Register).Methods("POST")
	r.HandleFunc("/login", accountHandler.Login).Methods("POST")
	r.HandleFunc("/refresh-tokens", accountHandler.RefreshTokens).Methods("POST")

	user := r.PathPrefix("/user").Subrouter()
	user.Use(authMiddleware)
	{
		user.HandleFunc("/profile", userHandler.GetProfile).Methods("GET")
		user.HandleFunc("/update-profile", userHandler.UpdateProfile).Methods("PUT")

		user.HandleFunc("/diagnose", userHandler.Diagnose).Methods("POST")

		user.HandleFunc("/diagnose-list", userHandler.GetDiagnoseList).Methods("GET")
		user.HandleFunc("/diagnose-data/{user-diagnose-id:[0-9]+}", userHandler.GetDiagnoseData).Methods("GET")
		user.HandleFunc("/add-end-date", userHandler.AddEndDate).Methods("PUT")

		user.HandleFunc("/statistics", userHandler.GetStatistics).Methods("GET")
	}

	serverfuncs.Run(cfg, r)
}
