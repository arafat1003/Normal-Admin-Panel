const mongoose = require("mongoose")


const tokenMOngoose = mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }

})

const Token =mongoose.model("Token",tokenMOngoose)

module.exports= Token