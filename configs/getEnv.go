package configs

import (
	"back-end/pkg/structs"
	"log"
	"os"

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

	cfg.Db.Host = os.Getenv("DB_HOST")
	cfg.Db.Port = os.Getenv("DB_PORT")
	cfg.Db.User = os.Getenv("DB_USER")
	cfg.Db.Password = os.Getenv("DB_PASSWORD")
	cfg.Db.DbName = os.Getenv("DB_NAME")

	return cfg
}
