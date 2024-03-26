package dbutils

var createUserQuery = `
	INSERT INTO users (nickname, email, password) 
	VALUES ($1, $2, $3)	
	ON CONFLICT (email)
	DO NOTHING
	RETURNING id
`

var createUserProfileQuery = `
	INSERT INTO user_profile (user_id, birth_date, gender, marital_status, having_children, job, location)
	VALUES ($1, $2, $3, $4, $5, $6, $7)
`

var LoginUserQuery = `
	SELECT id, is_admin, password 
	FROM users 
	WHERE email = $1
`

var addRefreshTokenQuery = `
	INSERT INTO tokens (user_id, refresh_token, expiration_time)
	VALUES ($1, $2, $3)
	ON CONFLICT (user_id)
	DO UPDATE 
	SET refresh_token = $2, expiration_time = $3
	WHERE tokens.user_id = $1
`

var checkRefreshTokenQuery = `
	SELECT user_id, is_admin, expiration_time
	FROM tokens JOIN users
	ON users.id = tokens.user_id 
	WHERE refresh_token = $1
`

var getUserProfileQuery = `
	SELECT nickname, email, password, birth_date, gender, marital_status, having_children, job, location 
	FROM users JOIN user_profile
	ON users.id = user_profile.user_id
	WHERE users.id = $1
`
