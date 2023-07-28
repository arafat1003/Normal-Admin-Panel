const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    Productname:{
        type:String,
        required:[true,"you have not given the name yet"],
        trim:true,

    },
    category:{
        type:String,
        required:[true,"no category  is included"],
        trim:true
    },
    quantity:{
        type:String,
        required:[true,"please choose the quantity"]
    },
    description:{
        type:String,
        required:[true,"no description is included , please give us a description"]
    },
  
    sku:{
        type:String,
        required:true,
        default:"sku"
    },
    price:{
        type:String,
        required:[true,"please add the price option"],
        trim:true
    },
    image:{
        type:Object,
        default:{},
        required:true
    },
  

},
{
    timestamps:true
})

const Product = mongoose.model("Product",productSchema)

module.exports = Product