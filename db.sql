-- Q4: Creating the database
CREATE DATABASE casino;
USE casino;

CREATE TABLE game_types (
    game_type_id INT PRIMARY KEY,
    type_name VARCHAR(255) NOT NULL
);

CREATE TABLE countries (
    country_id INT PRIMARY KEY,
    country_name VARCHAR(255) NOT NULL
);

CREATE TABLE games (
    game_id INT PRIMARY KEY,
    game_name VARCHAR(255) NOT NULL,
    game_type_id INT,
    FOREIGN KEY (game_type_id) REFERENCES game_types(game_type_id)
);

CREATE TABLE players (
    player_id INT PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    favorite_game_id INT,
    FOREIGN KEY (favorite_game_id) REFERENCES games(game_id)
);

CREATE TABLE allowed_countries (
    game_id INT,
    country_id INT,
    PRIMARY KEY (game_id, country_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id),
    FOREIGN KEY (country_id) REFERENCES countries(country_id)
);

-- Q5: Query to get all players with "SLOT" as their favorite game
SELECT p.player_id, p.player_name
FROM players p
JOIN games g ON p.favorite_game_id = g.game_id
JOIN game_types gt ON g.game_type_id = gt.game_type_id
WHERE UPPER(gt.type_name) = 'SLOT';
