package serverhandlers

import (
	"back-end/internal/pkg/structs"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func (u *UserHandler) UpdateProfile(w http.ResponseWriter, r *http.Request) {
	values := r.Context().Value(u.Server.Cfg.CtxKey).(map[string]interface{})
	userId := values["userId"].(int)

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer func() {
		err := r.Body.Close()
		if err != nil {
			fmt.Println(err)
		}
	}()

	var data structs.UpdateUserProfileRequest
	err = json.Unmarshal(body, &data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = u.Server.AppDb.UpdateUserProfile(userId, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
