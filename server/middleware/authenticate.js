const jwt = require("jsonwebtoken");
const User = require("../models/userSchema")
const authenticate = async (req, res, next) => {
    console.log("Entry");
    try {
         
        const token = req.cookies.jwtoken;
       console.log(token,"lklkl");
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!rootUser) {
            throw new Error("User Not Fount");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    } catch (e) {
        console.log(e.message, "---");
        res.status(401).send("Unauthorized")
    }
}
module.exports = authenticate;