const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);

// For Connecting this server with MongoDB Database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustertoymarketplaceju.tv6wggn.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const addedToyCollection = client.db("toyMarket").collection("addedToys");

        app.post("/addToys", async (req, res) => {
            const addToy = req.body;
            console.log(addToy);

            const result = await addedToyCollection.insertOne(addToy);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// Server data getting test code
app.get("/", (req, res) => {
    res.send("'Toy Marketplace' App is running");
});

// App is running on server or not - checking the console code for DEVOPS
app.listen(port, () => {
    console.log(`'Toy Marketplace' App is listening & running on the port: ${port}`);
});