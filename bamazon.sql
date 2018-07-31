DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(75) NULL,
  department_name VARCHAR(65) NULL,
  price DECIMAL(5,2) NULL,
  stock_quantity INT NULL,
  
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Aveeno Moisterizer", "Health and Beauty", 11.12,  22), ("Aveeno Face Wash", "Health and Beauty", 16.47,  17),
("Computer Science: An Overview", "Books", 154.99,  9), ("Practical Programming", "Book", 47.45,  19), 
("Kong Squeeze Toy", "Pet Supplies", 9.99,  30), ("Jerky Sticks", "Pet Supplies", 19.97,  7),
("Carter's Flannel Blanket", "Baby", 15.99,  21), ("The First Year: Snack Cups", "Baby", 5.32,  14),
("Astro 3-Port Portable Charger ", "Cell Phone Accessories", 39.99,  5), ("Yoassi Tea Diffuser", "Kitchen", 11.00,  31),
("Bose QuietComfort Headphones", "Electronics", 349.00,  8), ("ViewSonic PA503S HDMI Projector", "Electronics", 292.56,  4);