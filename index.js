import express from "express";
import parser from "body-parser";
import path from "path";
// Routers
import standardRouter from "./routes/standard";
import apiRouter from "./routes/api";
// For environment variables
require("dotenv").config();

// Creating the Express app and setting the parser
const app = new express();
app
    .use(parser.urlencoded({
        extended: false
    }))
    // defining the "public" folder as the root for static files
    .use(express.static(path.join(__dirname, "/public/")))
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://commus.fr");
        res.header("Access-Control-Allow-Methods", "DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

app
    .use("/", standardRouter)
    .use("/api", apiRouter);

app.listen(process.env.PORT);