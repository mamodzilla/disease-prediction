CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    nickname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS tokens (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    refresh_token VARCHAR,
    expiration_time BIGINT, 

    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_information (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL, 
    gender VARCHAR(255) NULL, 
    birth_date DATE NULL,
    job VARCHAR(255) NULL,
    marital_status VARCHAR(255) NULL,
    having_children BOOLEAN NULL, 
    location VARCHAR(255),

    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS diseases (
    id SERIAL PRIMARY KEY,
    disease_name VARCHAR(255) NOT NULL, 
    disease_description TEXT NULL,
    disease_duration INT NULL, 
    disease_location VARCHAR(255) NOT NULL,
    question_1 VARCHAR(255) NULL, 
    question_2 VARCHAR(255) NULL, 
    question_3 VARCHAR(255) NULL, 
    question_4 VARCHAR(255) NULL, 
    question_5 VARCHAR(255) NULL, 
    question_6 VARCHAR(255) NULL, 
    question_7 VARCHAR(255) NULL, 
    question_8 VARCHAR(255) NULL, 
    question_9 VARCHAR(255) NULL, 
    question_10 VARCHAR(255) NULL, 
    question_11 VARCHAR(255) NULL, 
    question_12 VARCHAR(255) NULL, 
    question_13 VARCHAR(255) NULL, 
    question_14 VARCHAR(255) NULL, 
    question_15 VARCHAR(255) NULL, 
    question_16 VARCHAR(255) NULL, 
    question_17 VARCHAR(255) NULL, 
    question_18 VARCHAR(255) NULL, 
    question_19 VARCHAR(255) NULL, 
    question_20 VARCHAR(255) NULL
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
    answer_1 VARCHAR(255) NULL,
    answer_2 VARCHAR(255) NULL,
    answer_3 VARCHAR(255) NULL,
    answer_4 VARCHAR(255) NULL,
    answer_5 VARCHAR(255) NULL,
    answer_6 VARCHAR(255) NULL,
    answer_7 VARCHAR(255) NULL,
    answer_8 VARCHAR(255) NULL,
    answer_9 VARCHAR(255) NULL,
    answer_10 VARCHAR(255) NULL,
    answer_11 VARCHAR(255) NULL,
    answer_12 VARCHAR(255) NULL,
    answer_13 VARCHAR(255) NULL,
    answer_14 VARCHAR(255) NULL,
    answer_15 VARCHAR(255) NULL,
    answer_16 VARCHAR(255) NULL,
    answer_17 VARCHAR(255) NULL,
    answer_18 VARCHAR(255) NULL,
    answer_19 VARCHAR(255) NULL,
    answer_20 VARCHAR(255) NULL,

    FOREIGN KEY(diagnose_id) REFERENCES diagnoses(id) ON DELETE CASCADE
);

