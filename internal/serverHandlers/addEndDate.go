package serverhandlers

import (
	"back-end/internal/pkg/structs"
	"encoding/json"
	"io"
	"net/http"
)

func (u *UserHandler) AddEndDate(w http.ResponseWriter, r *http.Request) {
	values := r.Context().Value(u.Server.Cfg.CtxKey).(map[string]interface{})
	userId := values["userId"].(int)

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var endDateRequest structs.EndDateRequest
	if err := json.Unmarshal(body, &endDateRequest); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := u.Server.AppDb.UpdateDiagnoseEndDate(userId, endDateRequest.UserDiagnoseId, endDateRequest.EndDate); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
