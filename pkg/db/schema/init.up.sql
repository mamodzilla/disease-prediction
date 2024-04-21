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
    birth_date DATE NULL,
    gender VARCHAR(255) NULL, 
    marital_status VARCHAR(255) NULL,
    having_children BOOLEAN NULL, 
    job VARCHAR(255) NULL,
    location VARCHAR(255),

    UNIQUE (user_id), 
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS diseases (
    id SERIAL PRIMARY KEY,
    disease_name VARCHAR(255) NOT NULL, 
    disease_description TEXT NULL,
    disease_duration INT NULL, 
    disease_location VARCHAR(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    disease_id INT NOT NULL, 
    q_1 VARCHAR(255) NULL, 
    q_2 VARCHAR(255) NULL, 
    q_3 VARCHAR(255) NULL, 
    q_4 VARCHAR(255) NULL, 
    q_5 VARCHAR(255) NULL, 
    q_6 VARCHAR(255) NULL, 
    q_7 VARCHAR(255) NULL, 
    q_8 VARCHAR(255) NULL, 
    q_9 VARCHAR(255) NULL, 
    q_10 VARCHAR(255) NULL, 
    q_11 VARCHAR(255) NULL, 
    q_12 VARCHAR(255) NULL, 
    q_13 VARCHAR(255) NULL, 
    q_14 VARCHAR(255) NULL, 
    q_15 VARCHAR(255) NULL, 
    q_16 VARCHAR(255) NULL, 
    q_17 VARCHAR(255) NULL, 
    q_18 VARCHAR(255) NULL, 
    q_19 VARCHAR(255) NULL, 
    q_20 VARCHAR(255) NULL

    FOREIGN KEY(disease_id) REFERENCES diseases(id) ON DELETE CASCADE
);  

CREATE TABLE IF NOT EXISTS diagnoses (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    disease_id INT NOT NULL,
    start_date DATE NULL,
    end_date DATE NULL,

    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(disease_id) REFERENCES diseases(id) ON DELETE CASCADE
); 

CREATE TABLE IF NOT EXISTS diagnose_data (
    id SERIAL PRIMARY KEY, 
    diagnose_id INT NOT NULL,
    a_1 VARCHAR(255) NULL,
    a_2 VARCHAR(255) NULL,
    a_3 VARCHAR(255) NULL,
    a_4 VARCHAR(255) NULL,
    a_5 VARCHAR(255) NULL,
    a_6 VARCHAR(255) NULL,
    a_7 VARCHAR(255) NULL,
    a_8 VARCHAR(255) NULL,
    a_9 VARCHAR(255) NULL,
    a_10 VARCHAR(255) NULL,
    a_11 VARCHAR(255) NULL,
    a_12 VARCHAR(255) NULL,
    a_13 VARCHAR(255) NULL,
    a_14 VARCHAR(255) NULL,
    a_15 VARCHAR(255) NULL,
    a_16 VARCHAR(255) NULL,
    a_17 VARCHAR(255) NULL,
    a_18 VARCHAR(255) NULL,
    a_19 VARCHAR(255) NULL,
    a_20 VARCHAR(255) NULL,

    FOREIGN KEY(diagnose_id) REFERENCES diagnoses(id) ON DELETE CASCADE
);

