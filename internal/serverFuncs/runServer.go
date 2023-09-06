package serverfuncs

import (
	"back-end/configs"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func Run(cfg *configs.Config, r *mux.Router) {
	s := &http.Server{
		Addr:    cfg.Host + ":" + cfg.Port,
		Handler: r,
	}

	log.Printf("Server is starting on %s", s.Addr)

	if err := s.ListenAndServe(); err != nil {
		if err == http.ErrServerClosed {
		} else {
			log.Fatalf("Server failed to start due to err: %v", err)
		}
	}

}
