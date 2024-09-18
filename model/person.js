import mongoose from "mongoose";
import { type } from "os";

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, address: {
        type: String,
        required: true
    }, phone: {
        type: String,
        required: true
    },
    work: {
        type: String,
        enum: ["Chief", "Manager", "Waiter"],
        required: true
    }
})

const Person = mongoose.model("Person", PersonSchema)
// comment add for testing github purpose
export default Person;