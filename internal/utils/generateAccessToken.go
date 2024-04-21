package utils

import (
	"back-end/pkg/structs"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func GenerateAccessToken(userId int, isAdmin bool, signingKey string, expTime int) (string, error) {
	accessTokenClaims := structs.AccessTokenClaims{
		UserId:  userId,
		IsAdmin: isAdmin,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * time.Duration(expTime))),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, accessTokenClaims)
	accessToken, err := token.SignedString([]byte(signingKey))
	if err != nil {
		return "", err
	}

	return accessToken, nil
}
