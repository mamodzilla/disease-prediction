package serverhandlers

import (
	"back-end/internal/pkg/structs"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func (u *UserHandler) GetDiagnoseData(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	if userDiagnoseIdStr, ok := vars["user-diagnose-id"]; !ok {
		w.Header().Set("Content-Type", "text/plain")
		fmt.Fprintf(w, "User diagnose id wasn't specified or is not a number!")
		w.WriteHeader(http.StatusBadRequest)
	} else {
		userDiagnoseId, err := strconv.Atoi(userDiagnoseIdStr)
		values := r.Context().Value(u.Server.Cfg.CtxKey).(map[string]interface{})
		userId := values["userId"].(int)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		var diagnoseData structs.DiagnoseDataResponse
		err = u.Server.AppDb.GetUserDiagnoseData(userDiagnoseId, userId).Scan(&diagnoseData.SymptomText, &diagnoseData.DiseaseName, &diagnoseData.DiseaseDescription)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		jsonDiagnoseData, err := json.Marshal(diagnoseData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		_, err = w.Write(jsonDiagnoseData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
	}
}
