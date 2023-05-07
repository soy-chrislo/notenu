/* CREATE DATABASE app; */

USE notenu;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users (name, password) VALUES ('chris', '12345');