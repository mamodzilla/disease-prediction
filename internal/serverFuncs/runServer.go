package serverfuncs

import (
	"back-end/internal/pkg/structs"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func Run(cfg *structs.Config, r *mux.Router) {
	s := &http.Server{
		Addr:    cfg.Server.Host + ":" + cfg.Server.Port,
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
