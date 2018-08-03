var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./connection.js'); //mysql connection info
var products = [];

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
     console.log('connected as id ' + connection.threadId);
    
  });

  //create product array
  function productArray() {
  connection.query("SELECT * FROM products", (err, res)=>{
    if(err) throw err;
    //console.log(JSON.stringify(res, null, 2));
    for(var i = 0; i < res.length; i++) {
      console.log(` Item ID: ${res[i].item_id} || ${res[i].product_name} || ${res[i].price} || ${res[i].stock_quantity}`);
      
    }
  
  });

    } //end proudctArray()  
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'viewProducts',
      message: 'View Products for Sale',
      //query and put products in an array
      choices: [ ]
    }
    
  ])
  .then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
  });
