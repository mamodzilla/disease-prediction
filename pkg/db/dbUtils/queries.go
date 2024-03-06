package dbutils

var createUserQuery = `
	INSERT INTO users (nickname, email, password) VALUES ($1, $2, $3)	
`
