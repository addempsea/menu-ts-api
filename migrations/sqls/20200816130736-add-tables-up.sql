/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS item(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    price INT NOT NULL,
    description VARCHAR NOT NULL,
    image VARCHAR NOT NULL
);
