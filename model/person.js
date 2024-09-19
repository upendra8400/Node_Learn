import mongoose from "mongoose";
import bcrypt from "bcrypt"
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
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

PersonSchema.pre('save', async function (next) {
    const Person = this;
    // hash the password only if it has been modified (or is new)
    if (!Person.isModified('password')) return next();
    try {
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash password
        const hashpassword = await bcrypt.hash(Person.password, salt);
        //Override the plain password to hashed password
        Person.password = hashpassword;
        next();

    } catch (error) {
        return next(error);
    }
})

PersonSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // compare password with hased password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const Person = mongoose.model("Person", PersonSchema)
// comment add for testing github purpose
export default Person;