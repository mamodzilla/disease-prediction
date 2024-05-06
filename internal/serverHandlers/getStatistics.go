package serverhandlers

import (
	"back-end/internal/pkg/structs"
	"encoding/json"
	"net/http"
)

func (u *UserHandler) GetStatistics(w http.ResponseWriter, r *http.Request) {
	values := r.Context().Value(u.Server.Cfg.CtxKey).(map[string]interface{})
	userId := values["userId"].(int)

	var statisticsResponse structs.StatisticsResponse
	if err := u.Server.AppDb.GetNumberRecordedDiseases(userId).Scan(&statisticsResponse.NumberRecordedDiseases); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	numberAnnualRecordedDiseases, err := u.Server.AppDb.GetNumberAnnualRecordedDiseases(userId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
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
