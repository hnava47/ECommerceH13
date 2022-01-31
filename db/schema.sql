-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

USE ecommerce_db;

CREATE TABLE Category(
    id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Product(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    stock INT NOT NULL DEFAULT 10,
    category_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES Category (id) ON DELETE SET NULL
);

CREATE TABLE Tag(
    id INT NOT NULL AUTO_INCREMENT,
    tag_name VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE ProductTag(
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT,
    tag_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE SET NULL,
    FOREIGN KEY (tag_id) REFERENCES Tag (id) ON DELETE SET NULL
);
