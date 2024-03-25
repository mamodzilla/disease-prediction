package dbutils

var createUserQuery = `
	INSERT INTO users (nickname, email, password) VALUES ($1, $2, $3)	
`
var LoginUserQuery = `
	SELECT user_id, is_admin, password FROM users WHERE email = $1
`

var addRefreshTokenQuery = `
	INSERT INTO tokens (user_id, refresh_token, expiration_time)
	VALUES ($1, $2, $3)
	ON CONFLICT (user_id) 
	SET refresh_token = $2, expiration_time = $3
	WHERE tokens.user_id = $1
`

var checkRefreshTokenQuery = `
	SELECT users.user_id, users.is_admin, tokens.expiration_time
	FROM tokens JOIN users
	ON users.user_id = tokens.user_id 
	WHERE token = $1
`
