package serverhandlers

import (
	"back-end/internal/pkg/structs"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

func (u *UserHandler) GetStatistics(w http.ResponseWriter, r *http.Request) {
	values := r.Context().Value(u.Server.Cfg.CtxKey).(map[string]interface{})
	userId := values["userId"].(int)

	var statisticsResponse structs.StatisticsResponse
	if err := u.Server.AppDb.GetNumberRecordedDiseases(userId).Scan(&statisticsResponse.NumberRecordedDiseases); err != nil {
		if err != sql.ErrNoRows {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "The user doesn't have recorded diagnoses!")
		}
		return
	}

	numberAnnualRecordedDiseases, err := u.Server.AppDb.GetNumberAnnualRecordedDiseases(userId)
	if err != nil {
		if err != sql.ErrNoRows {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "The user doesn't have recorded diagnoses!")
		}
		return
	}
	statisticsResponse.NumberAnnualRecordedDiseases = numberAnnualRecordedDiseases

	jsonStatisticsResponse, err := json.Marshal(statisticsResponse)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(jsonStatisticsResponse)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
