const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        src : { type:String, data:Buffer, required:true,unique:false },
        title : { type:String, required:true,unique:true },
        amount : { type:String, required:true,unique:true },
    },
    { timestamps : true }
)


module.exports = mongoose.model("Car Data", UserSchema)