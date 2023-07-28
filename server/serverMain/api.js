const express = require("express")
const homerouter =require("../routes/homeroute")
const productRouter = require("../routes/productrouter")
const contactRouter = require("../routes/contactusrouter")
const api = express.Router()

api.use("/product",productRouter)
api.use("/hello",homerouter)
api.use("/contact",contactRouter)

module.exports=api
    
