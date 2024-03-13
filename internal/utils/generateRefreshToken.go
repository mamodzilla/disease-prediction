package utils

import (
	"crypto/rand"
	"encoding/base64"
)

func GenerateRefreshToken() (string, error) {
	b := make([]byte, 64)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}

	refreshToken := base64.StdEncoding.EncodeToString(b)
	return refreshToken, nil
}
