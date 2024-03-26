package serverhandlers

import (
	"back-end/pkg/structs"
	"encoding/json"
	"net/http"
)

func (u *UserHandler) GetProfile(w http.ResponseWriter, r *http.Request) {
	var ctxKey structs.CtxKey
	values := r.Context().Value(ctxKey).(map[string]interface{})
	userId := values["userId"].(int)

	var rawResponse structs.UserProfileRawResponse
	err := u.Server.AppDb.GetUserProfile(userId).Scan(&rawResponse.Nickname, &rawResponse.Email, &rawResponse.Password, &rawResponse.BirthDate, &rawResponse.Gender, &rawResponse.MaritalStatus, &rawResponse.HavingChildren, &rawResponse.Job, &rawResponse.Location)
	if err != nil {
		http.Error(w, err.Error(), 500)
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
		http.Error(w, err.Error(), 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(jsonData)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	w.WriteHeader(200)
}
