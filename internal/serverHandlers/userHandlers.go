package serverhandlers

import (
	"back-end/pkg/structs"
	"encoding/json"
	"fmt"
	"io"
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

func (u *UserHandler) UpdateProfile(w http.ResponseWriter, r *http.Request) {
	var ctxKey structs.CtxKey
	values := r.Context().Value(ctxKey).(map[string]interface{})
	userId := values["userId"].(int)

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), 400)
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
		http.Error(w, err.Error(), 400)
		return
	}

	err = u.Server.AppDb.UpdateUserProfile(userId, data)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.WriteHeader(200)
}
