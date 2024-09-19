import express from "express";
const app = express();
import db from "./db.js"
import bodyParser from "body-parser"
import PersonRoutes from "./router/PersonRouter.js"
import MenuRoutes from "./router/MenuRouter.js"
import passport from "./Auth.js"
app.use(bodyParser.json());

app.get("/", (req, res) => {                                    // logRequest
    console.log("Welcome to Node Crud");
})

app.use(passport.initialize());
const localAuthMiddlware = passport.authenticate('local', { session: false })

//--------------------------------- router --------------------------------------------------


app.use("/person", PersonRoutes);
app.use("/menu", MenuRoutes)   // localAuthMiddlware 


//---------------------------------------------------------------------------------------------

app.listen(4000, () => {
    console.log("Server is running on Port:4000");
});