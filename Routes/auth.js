const router = require("express").Router()
const User = require("../Models/auths")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//Register new user
router.post("/register", async (req,res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ firstName: email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict 

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      "firstName": firstName,
      "lastName": lastName,
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
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Username and password are required." });

    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser)
      return res.status(401).json({ message: "Invalid email or password." });

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const isAdmin = foundUser.isAdmin
      // create JWTs
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "username": foundUser.email,
            "isAdmin": foundUser.isAdmin
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" } // increase expiration time
      );
      const newRefreshToken = jwt.sign(
        { email: foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "24h" } // increase expiration time
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = newRefreshToken;
      try {
        await foundUser.save();
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
      }

      // Send authorization roles and access token to user
      res.json({ email,isAdmin, accessToken });
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//Getting all User accounts from mongo db
router.get("/users", async (req,res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})


//Getting all User accounts from mongo db by ID
router.get("/users/:id", async (req,res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
})


//Updating User accounts from mongo db by ID
router.put("/users/update/:id", async (req,res) => {
  try {
    const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})


//Deleting User accounts from mongo db by ID
router.delete("/users/delete/:id", async (req,res) => {
  try {
    const deleteduser = await User.deleteOne({_id:req.params.id});
    res.status(200).json(deleteduser);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})


module.exports = router