const asyncHolder = require("express-async-handler");
const Product = require("../models/products.model");
const { fileSizeFormatter } = require("../uploadFileModule/uploadFile");
const cloudinary = require("cloudinary").v2;

const addProduct = asyncHolder(async (req, res) => {
  const { Productname, category, quantity, price, description } = req.body;

  if (!Productname || !category || !quantity || !price || !description) {
    res.status(401);
    throw new Error("no productname is found");
  }
  let fileData = {};
  if (req.file) {
    let cloudedFile;
    try {
      cloudedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(402);
      throw new Error(error);
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: cloudedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  const product = await Product.create({
    user: req.user.id,
    Productname,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });

  if (!product) {
    res.status(401);
    throw new Error("no product is found");
  }
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(401);
    throw new Error("no product is found22");
  }
});

const allProducts = asyncHolder(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(202).json(products);
  if (!products) {
    res.status(403);
    throw new Error("its a mystery");
  }
});

const getsingleProduct = asyncHolder(async (req, res) => {
  const products = await Product.findById(req.params.id);

  if (!products) {
    res.status(400);
    throw new Error();
  }

  if (products.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("no matching id is found");
  }
  res.status(200).json(products);
});

const deleteProducts = asyncHolder(async (req, res) => {
  const products = await Product.findByIdAndRemove(req.params.id);

  if (!products) {
    res.status(400);
    throw new Error("no product is found");
  }

  if (products.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("no matching id is found");
  }
  // await products.remove();
  res.status(200).json("successfully deleted");
});
const updateProduct = asyncHolder(async (req, res) => {
  const products = await Product.findById(req.params.id);
  if (!products) {
    res.status(400);
    throw new Error("no product is found");
  }

  if (products.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("no matching id is found");
  }
  const { Productname, category, quantity, price, description } = req.body;

  if (!Productname || !category || !quantity || !price || !description) {
    res.status(402);
    throw new Error(
      "no product,no category, no quantity is found in this described id "
    );
  }

  let fileData = {};

  if (req.file) {
    let cloudedFile;
    try {
      cloudedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(402);
      throw new Error(error);
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: cloudedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }
  const Updatedproducts = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      Productname,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? products.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(402).json(Updatedproducts);
});

module.exports = {
  addProduct,
  allProducts,
  getsingleProduct,
  deleteProducts,
  updateProduct,
};
