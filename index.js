const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Server data getting test code
app.get("/", (req, res) => {
    res.send("'Toy Marketplace' App is running");
});

// App is running on server or not - checking the console code for DEVOPS
app.listen(port, () => {
    console.log(`'Toy Marketplace' App is listening & running on the port: ${port}`);
});