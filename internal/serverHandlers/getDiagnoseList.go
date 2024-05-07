package serverhandlers

import (
	"back-end/internal/pkg/structs"
	"database/sql"
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

	defer func() {
		err := rows.Close()
		if err != nil {
			log.Println(err)
		}
	}()

	var diagnoseList []structs.DiagnoseItemResponse
	for rows.Next() {
		d := structs.DiagnoseItemResponse{}
		var endDate sql.NullString
		err := rows.Scan(&d.UserDiagnoseId, &d.DiseaseName, &d.StartDate, &endDate)
		if err != nil {
			log.Println(err)
			continue
		}
		d.EndDate = endDate.String

		diagnoseList = append(diagnoseList, d)
	}

	jsonDiagnoseList, err := json.Marshal(diagnoseList)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(jsonDiagnoseList)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
