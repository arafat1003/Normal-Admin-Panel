const mongoose =require("mongoose")
const express = require("express")
const dotenv = require("dotenv").config()

const app = require("./app")
const http = require("http")

const server = http.createServer(app)

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            server.listen(PORT,()=>{
                console.log(`listening to the ${PORT}`)
            })
        })
       
       
        .catch((err)=>{
            console.log("error") })