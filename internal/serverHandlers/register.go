package serverhandlers

import (
	"back-end/internal/pkg/structs"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func (a *AccountHandler) Register(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	defer func() {
		if err := r.Body.Close(); err != nil {
			fmt.Println(err)
		}
	}()

	var data structs.UserRegister
	if err := json.Unmarshal(body, &data); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	err = a.Server.AppDb.CreateUser(data)
	if err != nil {
		if err == sql.ErrNoRows {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(w, "A user with such an email already exists!")
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusCreated)
}
