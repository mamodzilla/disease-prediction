package serverhandlers

import (
	"back-end/internal/pkg/structs"
	"back-end/internal/utils"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"
)

func (a *AccountHandler) RefreshTokens(w http.ResponseWriter, r *http.Request) {
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

	var data structs.RefreshTokensRequest
	err = json.Unmarshal(body, &data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	userId, isAdmin, exists, err := a.Server.AppDb.CheckRefreshToken(data.RefreshToken)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, err.Error(), http.StatusBadRequest)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	if !exists {
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
	} else {
		w.Header().Set("Content-Type", "text/plain")
		fmt.Fprintf(w, "The refresh token is still valid")
		w.WriteHeader(http.StatusOK)
	}
}
