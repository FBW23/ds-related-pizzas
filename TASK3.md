# Data Modelling - Exercise #3 - Populating refs

Now our boss told us, he wants an overview of all our orders including all pizzas and the customer information. Not just the IDs of Pizzas and Customers, that information is useless for him. 

He wants to have everything in ONE overview.

No problem. We know how to do that... with populating!

Populating helps us, merging our "cluttered data", respectively our references, together.

## Task: Provide an overview of all orders

Setup a route "/orders"

This route should return ALL orders with all sub information as clear text:
* Customer information
* Ordered pizzas with name & price

### BONUS

Our boss just wants to see just the city of each customer, instead of the full customer info. Use the second parameter of the populate method to specify that.

Additionally he is not interested in all the ID and __v fields. Trim off all that fields from your resultset using the inverse field selector (-).