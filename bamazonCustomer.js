var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./connection.js'); //mysql connection info
var itemNumber = 0;
var inStock_quantity= 0;
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
   //console.log('connected as id ' + connection.threadId);
   start(); 
});

 
// ============List out products table (query)==============
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
//====== ask which item they'd like to buy (inquirer)=============
 
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
        //=========function call to query this item passing in item_id
        listSingleItem(itemNumber, howMany)
        })
}; //end liketoBuy()

 function listSingleItem(id){
    //when the prompt is answered, query the db
    connection.query("SELECT * FROM products WHERE item_id =?", [id], (err, res)=>{
    //console.log(res);
    for(var i=0; i< res.length; i++){
    console.log(`[In Cart]: ${res[i].product_name} || ${res[i].price}\n\n`);
    //console.log(`Stock quantity from DB for single Item ${res[i].stock_quantity}`);
    inStock_quantity = res[i].stock_quantity;
    };
    
     howMany();
  });
    
 }; //end listSingleItem()
 
 function howMany(){
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
          console.log(`Quantity: ${qty}\n`);
          stockCheck(qty);
    }); 
 }; //end howMany()
  //=============get stock_qty==============
 function stockCheck(qtyInCart){
      //console.log(`global var  qty= ${qtyInCart} and I'm in the function where I want to check the stock`);
        connection.query("SELECT * FROM products WHERE item_id =?", [itemNumber], (err, res)=>{
        for(var i=0; i< res.length; i++){
        var item = res[i].product_name;
        var price = res[i].price;
        separator();
        console.log(`Stock quantity from DB for ${item}: ${res[i].stock_quantity}`);
        inStock_quantity = res[i].stock_quantity;
        };
            if(inStock_quantity > qtyInCart){
               
                //update the DB to change stock_quantity for their item
                 connection.query("UPDATE products SET stock_quantity=stock_quantity-? WHERE item_id =?", [qtyInCart, itemNumber], (err, res) => {
                    //console.log(res);
                    separator();
                         console.log(`Your order has been placed:`)
                         console.log(`Order Details:`)
                         console.log(`${item} \t Quantity: ${qtyInCart} \t Total: $${price* qtyInCart}`)
                         connection.end();
                     
                 });
                
            } else{
                console.log(`Insufficient Quantity, Please make another selection\n\n\n`);
                start();

            }
        });
    }//end stockCheck()
function separator(){
  console.log(`--------------------------------------------------------------`);
};
 
    

 

