const express = require("express")
const { authverified } = require("../middleware/authMiddleware")
const { contactUsRouter } = require("../controllers/contactusController")

const contactRouter = express.Router()

contactRouter.post("/",authverified,contactUsRouter)

module.exports = contactRouter