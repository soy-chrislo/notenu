/* CREATE DATABASE app; */

USE notenu;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE permissions_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    permission_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (permission_id) REFERENCES permissions (id)
);

CREATE TABLE roles_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    rol_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (rol_id) REFERENCES roles (id)
);

INSERT INTO users (username, password) VALUES ('chris', '12345');
INSERT INTO permissions (name) VALUES ('Leer');
INSERT INTO permissions (name) VALUES ('Escribir');
INSERT INTO roles (name) VALUES ('Usuario regular');
INSERT INTO roles (name) VALUES ('Administrador');
INSERT INTO permissions_users (user_id, permission_id) VALUES (1, 1);
INSERT INTO permissions_users (user_id, permission_id) VALUES (1, 2);
INSERT INTO roles_users (user_id, rol_id) VALUES (1, 1);
