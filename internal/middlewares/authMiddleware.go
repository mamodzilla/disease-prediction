package middlewares

import (
	"back-end/pkg/structs"
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

func AuthMiddlewareWrapper(cfg *structs.Config) mux.MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		return AuthMiddleware(cfg, next)
	}
}

func AuthMiddleware(cfg *structs.Config, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprint(w, "Authorization header is missing!")
			return
		}
		tokenStr := strings.Split(authHeader, "Bearer ")[1]
		var claims structs.AccessTokenClaims
		token, err := jwt.ParseWithClaims(tokenStr, &claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(cfg.SigningKey), nil
		})

		if err != nil || !token.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprint(w, "Invalid token")
			return
		}

		var ctxKey CtxKey
		ctx := context.WithValue(r.Context(), ctxKey, map[string]interface{}{
			"userId":  claims.UserId,
			"isAdmin": claims.IsAdmin,
		})
		next.ServeHTTP(w, r.WithContext(ctx))
	})

}
