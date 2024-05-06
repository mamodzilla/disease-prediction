package configs

import (
	"back-end/internal/pkg/structs"
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

func NewConfig() *structs.Config {

	err := godotenv.Load("../../.env")

	if err != nil {
		log.Fatal("Error: loading .env-file")
	}

	cfg := &structs.Config{
		Server: structs.Server{},
	}

	cfg.Server.Host = os.Getenv("SERVER_HOST")
	cfg.Server.Port = os.Getenv("SERVER_PORT")
	cfg.Server.SigningKey = os.Getenv("SIGNING_KEY")

	cfg.Server.NnHost = os.Getenv("NN_HOST")
	cfg.Server.NnPort = os.Getenv("NN_PORT")

	cfg.Server.AccessTokenExpTime, err = strconv.Atoi(os.Getenv("ACCESS_TOKEN_EXP_TIME"))
	if err != nil {
		log.Println("Access token expiration time wasn't get!")
	}

	cfg.Server.RefreshTokenExpTime, _ = strconv.Atoi(os.Getenv("REFRESH_TOKEN_EXP_TIME"))
	if err != nil {
		log.Println("Refresh token expiration time wasn't get!")
	}

	cfg.CtxKey = structs.CtxKey{}

	cfg.Db.Host = os.Getenv("DB_HOST")
	cfg.Db.Port = os.Getenv("DB_PORT")
	cfg.Db.User = os.Getenv("DB_USER")
	cfg.Db.Password = os.Getenv("DB_PASSWORD")
	cfg.Db.DbName = os.Getenv("DB_NAME")

	return cfg
}
