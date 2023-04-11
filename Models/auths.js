
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        firstName : { type:String, required:true,unique:false },
        lastName : { type:String, required:true,unique:false },
        email : { type:String, required:true,unique:true },
        phone : { type:String, required:true,unique:true },
        password : { type:String, required:true },
        roles: {
            User: {
                type: Number,
                default: 2001
            },
            Editor: Number,
            Admin: Number
        },
    },
    { timestamps : true }
)

module.exports = mongoose.model("User logins", UserSchema)