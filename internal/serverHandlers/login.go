package serverhandlers

import (
	dbutils "back-end/internal/pkg/db/dbUtils"
	"back-end/internal/pkg/structs"
	"back-end/internal/utils"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

func (a *AccountHandler) Login(w http.ResponseWriter, r *http.Request) {
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

	var data structs.UserLogin
	if err := json.Unmarshal(body, &data); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	stmt, err := a.Server.AppDb.Db.Prepare(dbutils.LoginUserQuery)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var (
		userId       int
		isAdmin      bool
		userPassword string
	)
	err = stmt.QueryRow(data.Email).Scan(&userId, &isAdmin, &userPassword)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(userPassword), []byte(data.Password))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	accessToken, err := utils.GenerateAccessToken(userId, isAdmin, a.Server.Cfg.SigningKey, a.Server.Cfg.AccessTokenExpTime)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	refreshToken, err := utils.GenerateRefreshToken()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	responseData := structs.LoginResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}

	expirationTime := time.Now().Add(time.Hour * 24 * time.Duration(a.Server.Cfg.RefreshTokenExpTime)).Unix()
	err = a.Server.AppDb.AddRefreshToken(userId, refreshToken, int(expirationTime))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(responseData)
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
