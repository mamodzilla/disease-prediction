CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    nickname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,

    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS tokens (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    refresh_token VARCHAR,
    expiration_time BIGINT, 

    UNIQUE (user_id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL, 
    birth_date VARCHAR(255) NULL,
    gender VARCHAR(255) NULL, 
    marital_status VARCHAR(255) NULL,
    having_children BOOLEAN NULL, 
    job VARCHAR(255) NULL,
    location VARCHAR(255),

    UNIQUE (user_id), 
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS diagnoses (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    start_date VARCHAR(255) NULL,
    end_date VARCHAR(255) NULL,

    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
); 

CREATE TABLE IF NOT EXISTS diagnose_data (
    id SERIAL PRIMARY KEY, 
    diagnose_id INT NOT NULL,
    symptom_text VARCHAR(10000),
    disease_name VARCHAR(255),
    disease_description VARCHAR(10000),

    FOREIGN KEY(diagnose_id) REFERENCES diagnoses(id) ON DELETE CASCADE
);

