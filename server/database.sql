
-- create TABLE IF NOT EXISTS users(
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) UNIQUE NOT NULL,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     role VARCHAR(255) DEFAULT 'USER'
-- );

-- create TABLE repos(
--     id SERIAL PRIMARY KEY,
--     url VARCHAR(255),
--     title VARCHAR(255),
--     description VARCHAR(255),
--     rating REAL DEFAULT 0,
--     author VARCHAR(255),
--     FOREIGN KEY (author) REFERENCES users (name)
-- );

-- create TABLE ratings(
--     id SERIAL PRIMARY KEY,
--     rate INTEGER,
--     repo_id INTEGER,
--     user_id INTEGER,
--     FOREIGN KEY (repo_id) REFERENCES repos (id),
--     FOREIGN KEY (user_id) REFERENCES users (id)
-- );

-- create TABLE comments(
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255),
--     text VARCHAR(255),
--     user_id INTEGER,
--     repo_id INTEGER,
--     parent_id INTEGER DEFAULT 0,
--     FOREIGN KEY (user_id) REFERENCES users (id),
--     FOREIGN KEY (repo_id) REFERENCES repos (id),
--     FOREIGN KEY (parent_id) REFERENCES comments (id)
-- );