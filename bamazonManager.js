var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./connection.js'); //mysql connection info
var products = [];

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  
  managerView();
});


var inquirer = require('inquirer');
var array = [
  "View Products for Sale",
  "View Low Inventory",
  "Add to Inventory",
  "Add New Product"
];

function managerView() {}
inquirer.prompt([{
    type: 'list',
    name: 'manage',
    message: 'Manager View Menu: Pick a task.',
    choices: array,
    filter: function (val) {
      switch (val) {
        case "View Products for Sale":
          return forSale;
        case "View Low Inventory":
          return lowInv;
        case "Add to Inventory":
          return addInv;
        case "Add New Product":
          return addProduct;
        default:
          console.log(`Error detected.`)
      }
    }
  }

]).then(answers => {
  console.log(JSON.stringify(answers, null ,' '));
});