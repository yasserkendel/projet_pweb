/*Create the perfume_catalog database */
CREATE DATABASE IF NOT EXISTS perfume_catalog;

/* Use the perfume_catalog database */
USE perfume_catalog;

/* Create the products table*/
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255) NOT NULL 
);