package structs

import "github.com/golang-jwt/jwt/v4"

type UserRegister struct {
	Nickname string `json:"nickname"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserLogin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AccessTokenClaims struct {
	UserId   int    `json:"user_id"`
	IsAdmin  bool   `json:"is_admin"`
	Nickname string `json:"nickname"`
	jwt.RegisteredClaims
}

type LoginResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type RefreshTokensRequest struct {
	RefreshToken string `json:"refresh_token"`
}
