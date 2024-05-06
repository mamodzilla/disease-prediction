package serverhandlers

import (
	"back-end/internal/pkg/structs"
	"encoding/json"
	"log"
	"net/http"
)

func (u *UserHandler) GetDiagnoseList(w http.ResponseWriter, r *http.Request) {
	values := r.Context().Value(u.Server.Cfg.CtxKey).(map[string]interface{})
	userId := values["userId"].(int)

	rows, err := u.Server.AppDb.GetUserDiagnoseList(userId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var diseaseList []structs.DiagnoseItemResponse
	for rows.Next() {
		d := structs.DiagnoseItemResponse{}
		err := rows.Scan(&d.UserDiagnoseId, &d.DiseaseName, &d.StartDate, &d.EndDate)
		if err != nil {
			log.Println(err)
			continue
		}
		diseaseList = append(diseaseList, d)
	}

	jsonDiseaseList, err := json.Marshal(diseaseList)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(jsonDiseaseList)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
