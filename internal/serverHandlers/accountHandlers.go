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
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	defer func() {
		if err := r.Body.Close(); err != nil {
			fmt.Println(err)
		}
	}()

	var data structs.UserRegister
	if err := json.Unmarshal(body, &data); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	err = a.Server.AppDb.CreateUser(data)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Fprint(w, "The user already exists!")
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
	w.WriteHeader(http.StatusCreated)
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

func (a *AccountHandler) RefreshTokens(w http.ResponseWriter, r *http.Request) {
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
		w.WriteHeader(http.StatusOK)
		_, err = w.Write(jsonData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	} else {
		w.Header().Set("Content-Type", "text/plain")
		fmt.Fprintf(w, "The refresh token is still valid")
		w.WriteHeader(http.StatusOK)
	}
}
