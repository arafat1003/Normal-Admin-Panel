const asyncHolder = require("express-async-handler")
const User = require("../models/user.mongo")


const contactUsRouter  =asyncHolder(async(req,res)=>{
    const {subjects,messages}= req.body

    const user = await User.findById(req.user._id)

    if(!subjects){
        req.status(401)
        throw new Error("no sbject is found")
    }
    if(!messages){
        req.status(401)
        throw new Error("no message is written")
    }
    const message = messages
   const subject=subjects
   const send_to=process.env.EMAIL_USER
   const send_from= req.body.email
 
   try{
       await sendEmail(message,subject,send_from,send_to)
       res.status(200).json({success:true,message:"suck my ass"})
   }catch(err){
    res.status(500)
    throw new Error("no document is sending")
   }
})

module.exports={
    contactUsRouter
}