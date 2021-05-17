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

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ean VARCHAR(13) NOT NULL,
  itemName VARCHAR(50) NOT NULL,
  quantity INT,
  categoryID INT,
  locationID INT,
  FOREIGN KEY (locationID)
    REFERENCES locations(id)
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
