package serverhandlers

import (
	"back-end/pkg/structs"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func (a *AccountHandler) Register(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	defer func() {
		if err := r.Body.Close(); err != nil {
			fmt.Println(err)
		}
	}()

	var data structs.UserRegister
	if err := json.Unmarshal(body, &data); err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

}
