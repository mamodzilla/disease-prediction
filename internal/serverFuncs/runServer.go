package serverfuncs

import (
	"back-end/internal/pkg/structs"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func Run(cfg *structs.Config, r *mux.Router) {

	log.Printf("Server is starting on %s", cfg.Server.Host+":"+cfg.Server.Port)

	if err := http.ListenAndServe(cfg.Server.Host+":"+cfg.Server.Port,
		handlers.CORS(
			handlers.AllowedOrigins([]string{"*"}),
			handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
			handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		)(r)); err != nil {
		if err == http.ErrServerClosed {
		} else {
			log.Fatalf("Server failed to start due to err: %v", err)
		}
	}

}
