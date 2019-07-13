var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Tomorrow1074",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("connected as id " + connection.threadId);
  displayInventory();
});

var productPurchasePrompt = {
  type: "input",
  message: "Enter the ID number of the product you would like to purchase:",
  name: "product_purchase"
};
var productQuantityPrompt = {
  type: "input",
  message: "How many units of the product would you like to purchase?",
  name: "product_quantity"
};
var restartPrompt = {
  type: "list",
  message: "Would you like to shop again?",
  choices: ["Yes", "No"],
  name: "restart_prompt"
};

// displays all inventory when first running application
var displayInventory = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log(
      "WELCOME TO TARA'S BAMAZON STORE:" +
        "\n" +
        "~*~*~*~*~*~*~*~*~*~*~*~*~*~*~"
    );
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " +
          res[i].item_id +
          "\n" +
          "Product Name: " +
          res[i].product_name +
          "\n" +
          "Department Name: " +
          res[i].department_name +
          "\n" +
          "Price: " +
          res[i].price +
          "\n" +
          "Stock Quantity: " +
          res[i].stock_quantity +
          "\n~*~*~*~*~*~*~*~*~*~*~*~*~*~*~"
      );
    }
    promptCustomer(res);
  });
};

var promptCustomer = function(res) {
  inquirer.prompt([productPurchasePrompt]).then(function(inquirerResponse) {
    var chosenProductID = parseInt(inquirerResponse.product_purchase);
    for (var i = 0; i < res.length; i++) {
      if (res[i].item_id === chosenProductID) {
        var id = i;
        inquirer
          .prompt([productQuantityPrompt])
          .then(function(inquirerResponse) {
            var chosenQuantity = parseInt(inquirerResponse.product_quantity);

            if (res[id].stock_quantity - chosenQuantity >= 0) {
              var newQuantity = res[id].stock_quantity - chosenQuantity;
              var totalCost = res[id].price * chosenQuantity;
              var sql = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
              var values = [
                "products",
                "department_name",
                "stock_quantity",
                newQuantity,
                "item_id",
                chosenProductID
              ];
              connection.query(sql, values, function(err, res) {
                if (err) {
                  console.log(err);
                  connection.end();
                }

                console.log(
                  "Product(s) bought!" + "\n" + "Total Cost: $" + totalCost
                );

                inquirer
                  .prompt([restartPrompt])
                  .then(function(inquirerResponse) {
                    if (inquirerResponse.restart_prompt === "Yes") {
                      displayInventory();
                    } else {
                      console.log("Thank You!");
                      connection.end();
                    }
                  });
              });
            } else {
              console.log(
                "Insufficient Quantity! Please enter a number less than or equal to the selected item's available."
              );
              promptCustomer(res);
            }
          });
      }
    }
  });
};
