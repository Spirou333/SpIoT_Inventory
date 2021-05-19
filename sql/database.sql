CREATE DATABASE IoT_Inventory;
USE IoT_Inventory;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE brands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ean VARCHAR(13) NOT NULL,
  itemName VARCHAR(50) NOT NULL,
  brandID INT,
  type VARCHAR(80),
  size VARCHAR(20),
  usualPrice DECIMAL(4,2),
  favorite BOOLEAN,
  minimumQuantity INT,
  neededQuantity INT,
  quantity INT,
  locationID INT,
  FOREIGN KEY (locationID)
    REFERENCES locations(id),
  FOREIGN KEY (brandID)
    REFERENCES brands(id)
);

CREATE TABLE item_stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  itemID INT,
  storeID INT,
  FOREIGN KEY (itemID)
    REFERENCES items(id),
  FOREIGN KEY (storeID)
    REFERENCES stores(id)
);

CREATE TABLE item_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  itemID INT,
  categoryID INT,
  FOREIGN KEY (itemID)
    REFERENCES items(id),
  FOREIGN KEY (categoryID)
    REFERENCES categories(id)
);
