package serverhandlers

import (
	"back-end/internal/pkg/structs"
	"encoding/json"
	"io"
	"log"
	"net/http"
)

func (c *CommonHandler) Diagnose(w http.ResponseWriter, r *http.Request) {

	resp, err := http.Post("http://"+c.Server.Cfg.NnHost+":"+c.Server.Cfg.NnPort, "application/json", r.Body)
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

	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(respBody)
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
