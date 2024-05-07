package serverhandlers

import (
	"back-end/internal/pkg/structs"
	"encoding/json"
	"fmt"
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

	sqlRes, err := u.Server.AppDb.UpdateDiagnoseEndDate(userId, endDateRequest.UserDiagnoseId, endDateRequest.EndDate)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	rowsAffected, err := sqlRes.RowsAffected()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if rowsAffected == 0 {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "The user specified a non-existent diagnose id!")
	}

	w.WriteHeader(http.StatusOK)
}
