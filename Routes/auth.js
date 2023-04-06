const router = require("express").Router()
const User = require("../Models/auths")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//Register new user
router.post("/register", async (req,res) => {
    const { firstname, lastname, email, phone, password } = req.body;
    if (!firstname || !lastname || !email || !phone || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ firstname: email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "phone": phone,
            "password": hashedPwd
        });
        res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
})


//Login user
router.post("/login", async (req,res) =>{
    const { email, password } = req.body;
    if ( !email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.email,
                    "roles": roles
                }
            },          
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
        const newRefreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '15s' }
        );   
        // Saving refreshToken with current user
        const result = await foundUser.save();

        // Send authorization roles and access token to user
        res.json({email, accessToken });

    } else {
        res.sendStatus(401);
    }
})







module.exports = router