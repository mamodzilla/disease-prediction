package serverhandlers

import (
	"back-end/pkg/structs"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func (u *UserHandler) GetProfile(w http.ResponseWriter, r *http.Request) {
	values := r.Context().Value(u.Server.Cfg.CtxKey).(map[string]interface{})
	userId := values["userId"].(int)

	var rawResponse structs.UserProfileRawResponse
	err := u.Server.AppDb.GetUserProfile(userId).Scan(&rawResponse.Nickname, &rawResponse.Email, &rawResponse.Password, &rawResponse.BirthDate, &rawResponse.Gender, &rawResponse.MaritalStatus, &rawResponse.HavingChildren, &rawResponse.Job, &rawResponse.Location)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := structs.UserProfileResponse{
		Nickname:       rawResponse.Nickname,
		Email:          rawResponse.Email,
		Password:       rawResponse.Password,
		BirthDate:      rawResponse.BirthDate.String,
		Gender:         rawResponse.Gender.String,
		MaritalStatus:  rawResponse.MaritalStatus.String,
		HavingChildren: rawResponse.HavingChildren.Bool,
		Job:            rawResponse.Job.String,
		Location:       rawResponse.Location.String,
	}

	jsonData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(jsonData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

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

func (u *UserHandler) Diagnose(w http.ResponseWriter, r *http.Request) {
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
			log.Println(err)
		}
	}()

	var symptomData structs.DiagnoseRequest
	if err := json.Unmarshal(body, &symptomData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	diagnoseId, err := u.Server.AppDb.NoteDiagnose(userId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	resp, err := http.Post("http://"+u.Server.Cfg.NnHost+":"+u.Server.Cfg.NnPort, "application/json", r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer func() {
		err := resp.Body.Close()
		if err != nil {
			log.Println(err)
		}
	}()

	var diagnoseResponse structs.DiagnoseResponse
	if err := json.Unmarshal(respBody, &diagnoseResponse); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := u.Server.AppDb.NoteDiagnoseData(diagnoseId, symptomData.SymptomText, diagnoseResponse.DiseaseName, diagnoseResponse.DiseaseDescription); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(respBody)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
}

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
		err := rows.Scan(&d.DiagnoseId, &d.DiseaseName, &d.StartDate, &d.EndDate)
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

func (u *UserHandler) GetDiagnoseData(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	if diseaseIdStr, ok := vars["disease-id"]; !ok {
		w.Header().Set("Content-Type", "text/plain")
		fmt.Fprintf(w, "Disease-id isn't specified!")
		w.WriteHeader(http.StatusBadRequest)
	} else {
		diagnoseId, err := strconv.Atoi(diseaseIdStr)
		values := r.Context().Value(u.Server.Cfg.CtxKey).(map[string]interface{})
		userId := values["userId"].(int)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		var diagnoseData structs.DiagnoseDataResponse
		err = u.Server.AppDb.GetUserDiagnoseData(diagnoseId, userId).Scan(&diagnoseData.SymptomText, &diagnoseData.DiseaseName, &diagnoseData.DiseaseDescription)
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
