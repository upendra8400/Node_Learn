import express from "express";
const app = express();
import db from "./db.js"
import bodyParser from "body-parser"
import PersonRoutes from "./router/PersonRouter.js"
import MenuRoutes from "./router/MenuRouter.js"

app.use(bodyParser.json());

//================== router ============
app.use("/person", PersonRoutes);
app.use("/menu", MenuRoutes)

app.listen(4000, () => {
    console.log("Server is running on Port:4000");
});