const express = require("express")
const mongoose = require("mongoose")
const app = express()
const { Schema } = mongoose

mongoose.connect("mongodb://localhost/pizza_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// SCHEMAS

const AddressSchema = new Schema({
    street: String,
    zipcode: String,
    city: String
}, {_id: false}) // this prevents creation of an ID


// 1 Customer - n Orders
// 1 Order - 1 Customer
// One-to-Many relationship

// 1 Order - n Pizzas
// 1 Pizza - n Order
// Many-to-Many relationship

const CustomerSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: AddressSchema, required: true } // One-to-One - NESTING
}, { versionKey: false }) // => will kick out the __v thing

const OrderSchema = new Schema({
    date: { type: Date, required: true },
    customer: { ref: 'Customer', type: Schema.Types.ObjectId }, 
        // ID field => ObjectId => String 24chars
        // One-to-Many - REFERENCING
    pizzas: [{ ref: 'Pizza', type: Schema.Types.ObjectId }] // Many-to-Many  - REFERENCING
})

const PizzaSchema = new Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true}    
})

// One-to-One => NESTING (=> nesting a Schema)
// One-to-Many => REFERENCING (=> outsourcing data to separate collection and just referencing the iD)
// Many-to-Many => REFERENCING (=> outsourcing data to separate collection and just referencing the iD)


// MODELS
const Customer = mongoose.model("Customer", CustomerSchema)
const Order = mongoose.model("Order", OrderSchema)
const Pizza = mongoose.model("Pizza", PizzaSchema)

// EXPRESS PART STARTS HERE
const port = 8000
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

app.get("/seed", async (req, res, next) => {
    
    try {

        // clear / purge all customers in DB
        await Order.deleteMany()
        await Customer.deleteMany()
        await Pizza.deleteMany()

        // in order to create an order 
        // => we need to have customer already, and pizzas too

        // create fresh customer
        let customers = await Customer.create([
            { 
                firstname: "Vasilis", lastname: "Psychas", address: {
                    street: "Sesame Street 15", zipcode: "D-12345", city: "Berlin"
                } 
            },
            { 
                firstname: "Plamen", lastname: "M.", address: {
                    street: "Sesame Street 16", zipcode: "D-12345", city: "Berlin"
                }
            }
        ])

        console.log("Created customers in DB:", customers)

        // create pizzas
        let pizzas = await Pizza.create([
            { name: "Margherita", price: 4.99  },
            { name: "Funghi", price: 5.99  },
            { name: "Hawaii", price: 6.99  },
            { name: "Souvlaki", price: 7.99  },
        ])

        // create orders
        let orders = await Order.create([
            { date: "2020-07-08", customer: customers[0]._id, pizzas: pizzas[3]._id },
            { date: "2020-07-07", customer: customers[0]._id, pizzas: [ pizzas[1]._id, pizzas[2]._id ] },
        ])

        res.send({ customers, pizzas, orders })
    }
    catch(err) { next(err) }

})

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({error: {
        message: err.message
    }})    
})