# Data Modelling - Exercise #5 - Referencing continued...

Now we want to be able to store the quantity of each ordered pizza. Maybe a customer wants e.g. to order one Pizza Funghi and 2 x Pizza Hawaii.

So we want to update our schema to provide a quantity per ordered item.

Therefore we need a new OrderItem schema, which holds the ordered pizza and the additional quantity field.

## Task: Add OrderItems with quantity

* Create a OrderItem schema
    * Each OrderItem should reference a pizza item
    * Each OrderItem has a quantity (e.g. 3 x Pizza Funghi)

* Nest your OrderItem schema inside your Order schema
    * Replace your current reference to the Pizza schema with the OrderItem schema:
        * ` OrderSchema { items: [OrderItemSchema] } `

* Desired end result for an order stored in MongoDB:
    ```
        order: {
            customer: xyz,
            orderItems: [
                { pizza: <ID-of-Pizza1>, quantity: X }
                { pizza: <ID-of-Pizza2>, quantity: Y }
            ]
        }
    ```

* Update your seed script:
    * Customer 1 orders a pizza with a quantity of 2
    * Customer 2 orders one pizza with a quantity of 3
    * Test if it works by starting your app and calling your seed route in the browser 


### BONUS TASK

Let's use the power of our order item to provide even further pleasure to our pizza customers.

We want to provide some extra ingredients, e.g. add Feta cheese to your Brokkoli pizza. 
But of course this will have a small upsell to the pizza price. Our customers will understand.

We will nest the ingredients directly in the order item.

ToDo:
    * State addons on an Orderitem
        * Addons should be an array of objects 
        * An "addon" object has the following fields: 
            * name - String
            * upsell - Number
            * => example addon: {name: "Olives", upsell: 0.5 }

    * Desired end result for an order stored in MongoDB:
        ```
        order: {
            orderItems: [
                { pizza: <ID-of-Pizza1>, quantity: X, addon: [{ name: "Olives", upsell: 0.5 }] }
                { pizza: <ID-of-Pizza2>, quantity: Y, addon: [...] }
            ]
        }
        ```

    * Update your seed script:
        * Customer 2 orders one pizza with a quantity of 3 + one pizza with quantity 1 + Broccoli with an upsell of 0.8 EUR

    * Run your seed script to clear the old data structure and insert the new one

    * Update your /orders route
        * Populate now the pizza in an OrderItem


### BONUS TASK

Our boss is now interested in getting more information out of the orders.

He wants to have:
- the total price for every order item (so quantity*price of item)
- the total of the overall order

He wants to have the result sorted by order amount.

Unfortunately there is actually no way to do these calculations directly in a "normal" Mongoose query.

We have two ways to accomplish that need:
- Fetch the orders, loop over them, calculate the sums and add them to the result
- Calculate the sums directly in a so called "aggregation pipeline" (research needed)

Recommendation: Go for solution number one (for now).

For solution number two you need to research the so called "MongoDB Aggregation Pipeline" (also often named "Aggregation Framework")
* This is a good topic to investigate more once you wanna specialize on backend developend
* If you master the aggregation pipeline you basically master data querying and can get almost everything out of data
* But the aggregation pipeline is more complex than normal querying with Mongoose
* Great tool for testing querying and the aggregation framework: https://mongoplayground.net/
  * Define your data on the left pane
    * Format: db = { collectionName1: [...objects...], collectionName2: [...objects...] }
  * Write your queries in the mid pane and run them with the "Run" button
  * See the query results on the right
  * Practicing this will make you a backend data expert

Good luck!
