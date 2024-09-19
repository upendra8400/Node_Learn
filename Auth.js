import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local";
import Person from "./model/person.js";



//------------------------ Authentication and authorization---------------------------

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log('Received credential', username, password);
        const user = await Person.findOne({ username })
        if (!user) {
            return done(null, false, { message: "User not found" })
        }
        const IsMatchedPassword = user.comparePassword(password);
        if (!IsMatchedPassword) {
            return done(null, false, { message: "Incorrect Password" })
        }
    } catch (error) {
        return done(error)
    }
}))

export default passport;
