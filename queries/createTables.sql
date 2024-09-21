CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "post" (
    id SERIAL PRIMARY KEY,
    created_by_user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "solution" (
    id SERIAL PRIMARY KEY,
    post_id VARCHAR(55) NOT NULL,
    created_by_user_id VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

-- CREATE TABLE "ratings" (
--     id SERIAL PRIMARY KEY,
--     post_id INT REFERENCES solution(id) ON DELETE CASCADE,
--     user_id INT NOT NULL,  -- Assuming you have a users table to track which user voted
--     vote_type VARCHAR(10) CHECK (vote_type IN ('upvote', 'downvote')),
--     voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     UNIQUE (post_id, user_id)  -- Ensures each user can only vote once per post
-- );

CREATE TABLE "vote" (
    id SERIAL PRIMARY KEY,
    solution_id INT REFERENCES solution(id) ON DELETE CASCADE,
    created_by_user_id VARCHAR(255) NOT NULL,
    vote_type VARCHAR(10) CHECK (vote_type IN ('upvote', 'downvote')),
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);



-- CREATE TABLE "upvote" (
--     id SERIAL PRIMARY KEY,
--     solution_id INT REFERENCES solution(id) ON DELETE CASCADE,
--     created_by_user_id VARCHAR(255) NOT NULL,
--     vote_type VARCHAR(10) CHECK (vote_type IN ('upvote')),
--     voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     UNIQUE (solution_id, created_by_user_id)
-- );

-- CREATE TABLE "downvote" (
--     id SERIAL PRIMARY KEY,
--     solution_id INT REFERENCES solution(id) ON DELETE CASCADE,
--     created_by_user_id VARCHAR(255) NOT NULL,
--     vote_type VARCHAR(10) CHECK (vote_type IN ('downvote')),
--     voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     UNIQUE (solution_id, created_by_user_id)
-- );