// import modules
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose')
const morgan = require('morgan');
require("dotenv").config();

// app
const app = express();

// db
mongoose
    .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUNifiedTopology: true,
    })
    .then(() => console.log("DB CONNECTED..."))
    .catch((err) => console.log("DB CONNECTION ERROR", err));

//Middleware
app.use(morgan("dev"));
app.use(cors({origin: true, credentials: true}));

//Routes
const testRoutes = require('./routes/test');
app.use("/", testRoutes);

const port = process.env.PORT || 8080;

//listener
const server = app.listen(port, () => 
    console.log("Server is running on " + port)
);