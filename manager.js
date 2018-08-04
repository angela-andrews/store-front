var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./connection.js'); //mysql connection info
//var products = [];

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  } 
  
  });

  

  managerView();




function managerView() {
  

    inquirer.prompt([{
        type: 'list',
        name: 'manage',
        message: 'Manager View Menu: Pick a task.',
        choices: [
          'View Products for Sale',
          'View Low Inventory',
          'Add to Inventory',
          'Add New Product'
        ],
        filter: function (val) {
          //return val;
          if(val ==='View Products for Sale') {
            return 'viewInventory';
          }else if(val ==='View Low Inventory') {
            return 'lowInventory';
          }else if (val === 'Add to Inventory') {
            return 'addInventory';
          }else if (val ==='Add New Product'){
            return 'addNew';
          }else {
            console.error('Error: selection not programmed');
            
          }
        }
      }

    ]).then(choice => {
      console.log(`Manager choice:`+  JSON.stringify(choice));
        if(choice.manage === 'viewInventory'){
          viewProducts();
        }else if (choice.manage === 'lowInventory'){
          viewLowInventory()
        }else if(choice.manage === 'addInventory'){
          addToInventory()
        }else if(choice.manage ==='addNew' )
        addNewProduct()
    });
  }; //end managerView();

  function viewProducts(){
    console.log(`view products function \n`);
  };
  function viewLowInventory(){
    console.log(`view low inventory function \n`);
  };
  function addToInventory(){
    console.log(`view add to inventory function \n`);
  };
  function addNewProduct(){
    console.log(`view add new product function \n`);
  };
