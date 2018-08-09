var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./connection.js'); //mysql connection info
var selectedId = null;
var selectedQty = null;

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

});

managerView();
/*
=================================================
Manager view only works up to View Low Inventory
=================================================
*/
function managerView() {

  inquirer.prompt([{
      type: 'list',
      name: 'manage',
      message: 'Manager View Menu: Pick a task.',
      choices: [
        'View Products for Sale',
        'View Low Inventory',
        'Add to Inventory',
        'Add New Product',
        '(Exit Program)'

      ],
      filter: function (val) {
        //return val;
        if (val === 'View Products for Sale') {
          return 'viewInventory';
        } else if (val === 'View Low Inventory') {
          return 'lowInventory';
        } else if (val === 'Add to Inventory') {
          return 'addInventory';
        } else if (val === 'Add New Product') {
          return 'addNew';
        } else if (val === '(Exit Program)') {
          return 'quit';
        } else {
          console.error('Error: selection not programmed');

        }
      }
    }

  ]).then(choice => {
    //console.log(`Manager choice:`+  JSON.stringify(choice));
    if (choice.manage === 'viewInventory') {
      viewProducts();
    } else if (choice.manage === 'lowInventory') {
      viewLowInventory();
    } else if (choice.manage === 'addInventory') {
      addToInventory();
    } else if (choice.manage === 'addNew') {
      addNewProduct();
    } else if (choice.manage === 'quit') {
      console.log("Goodbye!")
      connection.end();

      return;
    }

  });
}; //end managerView();

function viewProducts() {
  //query db for every item: ID, Name, Price, Qty
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM products", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      //console.log(JSON.stringify(res, null, 2));
      for (var i = 0; i < res.length; i++) {
        console.log(` Item ID: ${res[i].item_id} || ${res[i].product_name} || ${res[i].price}  ||Qty: ${res[i].stock_quantity}`)
      }
      console.log(`\n`);
      resolve(true);
    })

  }).then(function () {
    managerView();
    return true;

  })

};

function viewLowInventory() {
  //query DB and list items with count lower than 5
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      //console.log(JSON.stringify(res, null, 2));
      for (var i = 0; i < res.length; i++) {
        console.log(` Item ID: ${res[i].item_id} || ${res[i].product_name} || ${res[i].price}  ||Qty: ${res[i].stock_quantity}`)
      }
      console.log(`\n`);
      resolve(true);
    })

  }).then(function () {
    managerView();
    return true;

  })


};

function addToInventory() {
  //Update that items qty from input 
  //This needs to be a promise
  var questions = [{
      type: 'input',
      name: 'id',
      message: "Enter the ID of the product to increase inventory:"
    },
    {
      type: 'input',
      name: 'newQty',
      message: "How many would you like to add to inventory?",
      validate: function (value) {
        var qty = parseInt(value);
        return true;
      }
    }

  ];
  return inquirer.prompt(questions)
  .then(answers => {
    //console.log(JSON.stringify(answers, null, '  '));
    selectedId = parseInt(answers.id);
    selectedQty = parseInt(answers.newQty);
    console.log(`Selected ID:  ${selectedId}  Quantity ${selectedQty}`);
    
    connection.query("UPDATE products SET stock_quantity = stock_quantity + ?  WHERE item_id =?", [selectedId, selectedQty] , (err, res)=>{
      if(err){
        console.log(`Error: ${err}`);
      }else{
        console.log(res);
        // console.log(`looooop`);
        // console.log(`Quantity Update: Item ID: ${res[x].item_id} ||  ${res[x].product_name}  ||  ${res[x].stock_quantity} `);

      }
      
    
    } )//end connetion query
      

  })   
  
    
  
    
 
    
}//end addToInventory();



function addNewProduct() {
  console.log(`view add new product function \n`);
  //another inquirer to add an item to the DB
  // Update 3 inputs, Name, Price, Qty 
};

// function separator(){
//   console.log(`---------------------------------------------------`);
// };