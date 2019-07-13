DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products
(
    item_id INT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(4, 0),
    stock_quantity INT,

    PRIMARY KEY(item_id)
);

INSERT INTO products
    (item_id, product_name, department_name, price, stock_quantity)
VALUES
    (1, "Jeans", "Women & Girl's", 45.00, 20),
    (2, "Dress", "Women & Girl's", 75.00, 20),
    (3, "Shoes", "Women & Girl's", 50.00, 20),
    (4, "Pants", "Men & Boys", 35.00, 20),
    (5, "Ties", "Men & Boys", 25.00, 20),
    (6, "Jacket", "Men & Boys", 40.00, 20),
    (7, "Sneakers", "Men & Boys", 50.00, 20),
    (8, "Bike", "Kid Toys", 120.00, 20),
    (9, "Rollerblades", "Kid Toys", 80.00, 20),
    (10, "Blocks", "Kid Toys", 5.00, 20)
