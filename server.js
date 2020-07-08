const express = require("express")
const mongoose = require("mongoose")
const app = express()
const { Schema } = mongoose

mongoose.connect("mongodb://localhost/pizza_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const AddressSchema = new Schema({
    street: String,
    zipcode: String,
    city: String
}, {_id: false}) // this prevents creation of an ID

const CustomerSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: AddressSchema, required: true }
}, { versionKey: false }) // => will kick out the __v thing

const Customer = mongoose.model("Customer", CustomerSchema)

const port = 8000
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

app.get("/seed", async (req, res, next) => {
    
    try {

        // clear / purge all customers in DB
        await Customer.deleteMany()

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

        res.send(customers)
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