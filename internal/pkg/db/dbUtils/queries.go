package dbutils

const (
	createUserQuery = `
		INSERT INTO users (nickname, email, password) 
		VALUES ($1, $2, $3)	
		ON CONFLICT (email)
		DO NOTHING
		RETURNING id
	`

	createUserProfileQuery = `
		INSERT INTO user_profiles (user_id, birth_date, gender, marital_status, having_children, job, location)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`

	LoginUserQuery = `
		SELECT id, is_admin, password 
		FROM users 
		WHERE email = $1
	`

	addRefreshTokenQuery = `
		INSERT INTO tokens (user_id, refresh_token, expiration_time)
		VALUES ($1, $2, $3)
		ON CONFLICT (user_id)
		DO UPDATE
		SET refresh_token = $2, expiration_time = $3
		WHERE tokens.user_id = $1
	`

	checkRefreshTokenQuery = `
		SELECT user_id, is_admin, expiration_time
		FROM tokens JOIN users
		ON users.id = tokens.user_id 
		WHERE refresh_token = $1
	`

	getUserProfileQuery = `
		SELECT nickname, email, password, birth_date, gender, marital_status, having_children, job, location 
		FROM users JOIN user_profiles
		ON users.id = user_profiles.user_id
		WHERE users.id = $1
	`

	updateUserDataQuery = `
		UPDATE users
		SET nickname = $1, email = $2, password = $3 
		WHERE id = $4
	`

	updateUserProfileQuery = `
		UPDATE user_profiles
		SET birth_date = $1, gender = $2, marital_status = $3, having_children = $4, job = $5, location = $6
		WHERE user_id = $7
	`

	noteDiagnoseQuery = `
		INSERT INTO diagnoses (user_id, user_diagnose_id, start_date)
		VALUES ($1, $2, $3)
		RETURNING id
	`

	noteDiagnoseDataQuery = `
		INSERT INTO diagnose_data (diagnose_id, symptom_text, disease_name, disease_description)
		VALUES ($1, $2, $3, $4)
	`

	getUserDiagnoseListQuery = `
		SELECT d.user_diagnose_id, dd.disease_name, d.start_date, d.end_date
		FROM diagnoses d JOIN diagnose_data dd 
		ON d.id = dd.diagnose_id
		WHERE d.user_id = $1
	`

	getUserDiagnoseNumberQuery = `
		SELECT COUNT(*) AS user_diagnose_count
		FROM diagnoses
		WHERE user_id = $1
		GROUP BY user_id
	`

	getUserDiagnoseData = `
		SELECT symptom_text, disease_name, disease_description
		FROM diagnose_data JOIN diagnoses
		ON diagnoses.id = diagnose_data.diagnose_id
		WHERE user_diagnose_id = $1 AND user_id = $2
	`

	updateDiagnoseEndDateQuery = `
		UPDATE diagnoses
		SET end_date = $1
		WHERE user_id = $2 AND user_diagnose_id = $3
	`

	getUserDiagnoseStartDates = `
		SELECT d.start_date
		FROM diagnoses d JOIN diagnose_data dd 
		ON d.id = dd.diagnose_id
		WHERE d.user_id = $1
	`
)
