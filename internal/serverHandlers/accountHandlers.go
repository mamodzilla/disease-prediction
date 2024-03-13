package serverhandlers

import (
	"back-end/internal/utils"
	dbutils "back-end/pkg/db/dbUtils"
	"back-end/pkg/structs"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

func (a *AccountHandler) Register(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	defer func() {
		if err := r.Body.Close(); err != nil {
			fmt.Println(err)
		}
	}()

	var data structs.UserRegister
	if err := json.Unmarshal(body, &data); err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	err = a.Server.AppDb.CreateUser(data)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	w.WriteHeader(201)
}

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
		http.Error(w, err.Error(), 400)
		return
	}

	stmt, err := a.Server.AppDb.Db.Prepare(dbutils.LoginUserQuery)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	var userId int
	var nickname string
	var userPassword string
	err = stmt.QueryRow(data.Email).Scan(&userId, &nickname, &userPassword)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(userPassword), []byte(data.Password))
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	accessToken, err := utils.GenerateAccessToken(userId, nickname, a.Server.Cfg.Server.SigningKey)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	refreshToken, err := utils.GenerateRefreshToken()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	responseData := structs.LoginResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}

	expirationTime := time.Now().Add(time.Hour * 24 * 14).Unix()
	err = a.Server.AppDb.AddRefreshToken(userId, refreshToken, int(expirationTime))
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	jsonData, err := json.Marshal(responseData)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	_, err = w.Write(jsonData)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
}

func (a *AccountHandler) RefreshTokens(w http.ResponseWriter, r *http.Request) {
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

	var data structs.RefreshTokensRequest
	err = json.Unmarshal(body, &data)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	userId, nickname, exists, err := a.Server.AppDb.CheckRefreshToken(data.RefreshToken)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, err.Error(), 400)
		} else {
			http.Error(w, err.Error(), 500)
		}
		return
	}

	if !exists {
		accessToken, err := utils.GenerateAccessToken(userId, nickname, a.Server.Cfg.Server.SigningKey)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		refreshToken, err := utils.GenerateRefreshToken()
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		responseData := structs.LoginResponse{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		}

		expirationTime := time.Now().Add(time.Hour * 24 * 14).Unix()
		err = a.Server.AppDb.AddRefreshToken(userId, refreshToken, int(expirationTime))
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		jsonData, err := json.Marshal(responseData)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)
		_, err = w.Write(jsonData)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
	} else {
		w.Header().Set("Content-Type", "text/plain")
		fmt.Fprintf(w, "The refresh token is still valid")
		w.WriteHeader(200)
	}
}
