const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");
require("../db/conn")
const User = require("../models/userSchema");

router.post("/register", (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    console.log(req.body);
    if ( !name|| !email|| !phone|| !work|| !password|| !cpassword) {
        return res.status(400).json({ error:"incmplete data"})
    }
    User.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
            return res.status(422).json({error: "User Already Exists"});
            }
            if (password !== cpassword) {
                 return res.status(422).json({error: "Matching Passsword Error"});
            }
            
            const user = new User({ name, email, phone, work, password, cpassword });

            
            user.save().then((user) => {
                res.status(201).json({ success: "User Registered Successfully" });
            }).catch((error) => {res.status(500).json({error: "Failed to register user"})})

    }).catch((error) => {res.status(500).json({error: "Error"})})

});
 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Invalid Credentials" });
    }
    const user = await User.findOne({ email: email });
    console.log(user,"USER");

    if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
    }
    
        const match=await bcrypt.compare(password, user.password)

    if (!match) {
         return res.status(400).json({ error: "Invalid Credentials" });        
    }
    const token = await user.generateAuthToken();
    console.log(token);
    res.cookie("jwtoken", token, { expires: new Date(Date.now() + 60000) });



    console.log(user);
    res.status(201).json({ success: "User logged in Successfully" });

})

router.get("/about",authenticate, (req, res) => {
    res.send(req.rootUser);
})

router.get("/contact",authenticate, (req, res) => {
    res.send(req.rootUser);
})
module.exports = router;

