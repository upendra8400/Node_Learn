import mongoose from "mongoose";
const mongoURL = 'mongodb://127.0.0.1:27017/Node_Learn';


mongoose.connect(mongoURL, {
    // useNewParser: true,
    // useUnifiedTopology: true
})


const db = mongoose.connection;

db.on('connected', () => {
    console.log("Database connected successfully");
})

db.on('error', (err) => {
    console.log("Conneted to MongoDB server", err);
})

db.on('disconnected', () => {
    console.log("Conneted disconnected");
})


export default db;