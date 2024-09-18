import mongoose from "mongoose";
import { type } from "os";



const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ["sweet", "spicy", "sour"],
        required: true
    },
    isDrink: {
        type: Boolean,
        default: false
    },
    ingredient: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
})
const Menu = mongoose.model("Menu", MenuSchema)
export default Menu;