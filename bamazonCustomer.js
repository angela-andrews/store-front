var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./connection.js'); //mysql connection info
var itemNumber = 0;

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
   //console.log('connected as id ' + connection.threadId);
   start(); 
});
//connection.end(); // here for testing

// List out products table (query)
function start() {
  connection.query("SELECT * FROM products", (err, res)=>{
    if(err) throw err;
    //console.log(JSON.stringify(res, null, 2));
    for(var i = 0; i < res.length; i++) {
      console.log(` Item ID: ${res[i].item_id} || ${res[i].product_name} || ${res[i].price}`)
    }
    likeToBuy();
  });

};
// ID | item | price
// ask which item they'd like to buy (inquirer) add function to call select 
var question = [
  {
    type: 'input',
    name: 'item_id',
    message: "What is the ID of the item you'd like to purchase? \n"
  }
  
];
function likeToBuy(){
      inquirer.prompt(question).then(answers => {
        //console.log(JSON.stringify(answers, null, '  '));
        //console.log(`ID: ${answers.item_id}`)
        itemNumber = answers.item_id;
         //console.log(`ID ${itemNumber}`);
         //function call to query this item passing in item_id
         listSingleItem(itemNumber)
});
}
function listSingleItem(id){
  var query = connection.query("SELECT * FROM products WHERE item_id =?", [id], (err, res)=>{
    //console.log(res);
    for(var i=0; i< res.length; i++){
    console.log(` Item ID: ${res[i].item_id} || ${res[i].product_name} || ${res[i].price}`)
    };
  });
}
//list out item_id. use that to  ask how many untits they'd like to purchase
// 