package utils

import (
	"back-end/pkg/structs"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func GenerateAccessToken(userId int, nickname string, signingKey string) (string, error) {
	accessTokenClaims := structs.AccessTokenClaims{
		UserId:   userId,
		Nickname: nickname,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * 20)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, accessTokenClaims)
	accessToken, err := token.SignedString([]byte(signingKey))
	if err != nil {
		return "", err
	}

	return accessToken, nil
}
