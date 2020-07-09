# Data Modelling - Exercise #4 - Advanced querying

## Task

Let's retrieve our pizza data 

Create a route /pizzas
- Fetch & return all pizzas here please
  - Only show type and price per pizza (excluding the ID field)
  - Sort pizzas by name in descending order
  - If it happens you already have them in this order: Sort them by price descending instead - from expensive to cheap
  - If that happens to be the case as well: Sort them by price ascending :)

Searching a pizza by name 
- Adapt your route /pizzas
- Check for a "name" query parameter and return just pizzas matching that one
  - Query parameters are stated in the url like so: /pizzas?key=value, e.g. /pizzas?name=Funghi
  - You can access query parameters in your Express route with the special object: req.query
  - console.log that object in your pizzas route
  - Try to access the route with a query parameter and check if it is logged to the cnsole
  - If parameter "name" is given
    - Search for that pizza name
  - How are query parameters e.g. ?name=val different from route parameter, e.g /:name
    - Route parameter: Typically used to grab exactly ONE item by the identifier of the record
    - Query parameter: Typically used for additional search criteria / filtering data
  
  
## BONUS TASK

Allow searching for just a part of the pizza name
  - Research how to do a partial search with mongoose using the $regex option in your find query or with an RegExp JavaScript object
  - Adapt your pizzas route accordingly so we can do search for a pizza part now, e.g. just "Hawa" instead of the full name "Hawaii"

Our boss changed his mind:
He now wants to see firstname, lastname and city per customer. Adapt your orders route please!
