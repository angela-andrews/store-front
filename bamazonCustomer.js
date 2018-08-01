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
// ask which item they'd like to buy (inquirer) add function to call select * on item_id

function likeToBuy(){
  var question = [
    {
      type: 'input',
      name: 'item_id',
      message: "What is the ID of the item you'd like to purchase? \n"
    }
    
  ];
      inquirer.prompt(question).then(answers => {
        //console.log(JSON.stringify(answers, null, '  '));
        itemNumber = answers.item_id;
        //function call to query this item passing in item_id
        //listSingleItem(itemNumber)
})
 .then(function(){
    //when the prompt is answered, query the db
    connection.query("SELECT * FROM products WHERE item_id =?", [itemNumber], (err, res)=>{
    //console.log(res);
    for(var i=0; i< res.length; i++){
    console.log(` Item ID: ${res[i].item_id} || ${res[i].product_name} || ${res[i].price}\n\n`);
    };
    
  });
   
 });


}// maybe a then here to run howMany()????
//list out item_id. use that to  ask how many units they'd like to purchase
function listSingleItem(id){
  var query = connection.query("SELECT * FROM products WHERE item_id =?", [id], (err, res)=>{
    //console.log(res);
    for(var i=0; i< res.length; i++){
    console.log(` Item ID: ${res[i].item_id} || ${res[i].product_name} || ${res[i].price}\n\n`);
    };
  });
  //maybe call howMany() and pass in the id for another requery to check quantity
  
}
// howMany(); //having it here makes it call before the intial select.
// function asking how many units they'd like to buy
function howMany(){
  //inquirer
  var question = [
    {
      type: 'input',
      name: 'quantity',
      message: "How many would you like to buy? \n"
    }
  ];
    inquirer.prompt(question).then(answers => {
      //console.log(JSON.stringify(answers, null, '  '));
      var qty = answers.quantity;
      console.log(`Quantity: ${qty}`);
      //function call to query this item passing in item_id
      //listSingleItem(id);
});
  //take the number and re query selectSingleItem passing 
  
};

// function quantityCheck(x){
//   //requery the item and check the quantity

//   /*if (stock_quantity >0){

//   }
//   */

// };