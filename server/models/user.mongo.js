const mongoose =require("mongoose")
const bcrypt = require("bcrypt")

const schema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please input a valid item"],
        
    },
    email:{
        type:String,
        required:[true,'please input a valid email address'],
        unique:true,
        trim:true,
        match:[/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,"input a correct valid address"],

    },
    phonenumber:{
        type:String,
        required:true,
        default:+2132

    },
    photo:{
        type:String,
        required:true,
        default:"https://images.unsplash.com/photo-1525672716948-1f0bb9c49883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"

    },
    password:{
        type:String,
        minLength:[6, "please increase the length"],
        maxLength:[329,"please reduce the length"],
        required:true

    },
    bio:{
        type:String,
        maxLength:[250,"please provide a shorter length"]
    }

})
schema.pre("save",async function (next){


    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password,salt)
    this.password = hashPassword
})

const User = mongoose.model("User",schema)

module.exports=User