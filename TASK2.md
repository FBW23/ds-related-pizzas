# Data Modelling - Exercise #2 - References (Ref)

In this exercise we want to train create relationships between MongoDB collections.

We will do so by create a basic Pizza shop data model.

## Task: Create a pizza shop data model

* Create Mongoose schemas to realize your pizza store data model
    * Create a pizza model (fields: name, price)
    * Create an order model (field: date of the order)

* Setup relationships between Pizzas, Orders and Customers
    * Place a ref to the customer model in the order schema ("Every order has exaxtly ONE customer")
    * Place a array ref to the pizzas model in the order schema ("Every order can have ONE up to MANY pizzas")
   * use a "ref" field to declare relations: ` { type: Schema.Types.ObjectId, ref: '<OtherModel>' } `
 

## BONUS TASK

Update your seed route for inserting relational data:
- Insert 3 pizzas
- Insert two orders:
	- customer 1 ordered one pizza today
	- customer 2 ordered two pizzas yesterday

Test if it works by starting your app and calling your seed route in the browser 

If it works: setup purging of your data before seeding
- Clear all orders
- Clear all pizzas
- Clear all customers

This will prevent that you get an overload of data into your DB (much easier for testing)


## BONUS TASK

* Outsource the schemas + models to a models folder 
    * Create a file for each schema: customer.js, order.js, pizza.js
    * Export the model at the end of each file
* Import the models in your server.js file