const express = require("express")
const {addProduct, allProducts, getsingleProduct, deleteProducts, updateProduct} =require("../controllers/productController")
const { authverified } = require("../middleware/authMiddleware")
const { upload } = require("../uploadFileModule/uploadFile")
const productRouter = express.Router()

productRouter.post("/posting",authverified,upload.single("image"),addProduct)
productRouter.patch("/updated/:id",authverified,updateProduct)
productRouter.get("/allrouter",authverified,allProducts)
productRouter.get("/:id",authverified,getsingleProduct)
productRouter.delete("/:id",authverified,deleteProducts)
module.exports = productRouter