import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertFromHTML } from "quill-delta-to-html";
import { EditorState } from "draft-js";
import {
  createProduct,
  isLoadingProduct,
} from "../../redux/productSlicer/productSlicer";

import ProductItem from "./ProductItem";
const initialState = {
  productname: "",
  category: "",
  quantity: "",
  price: "",
};
const Productss = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(isLoadingProduct);
  const [formData, setFormdata] = useState(initialState);
  const [image, setProductimage] = useState("");
  const [previewImage, setPreviwImage] = useState(null);
  const [description, setDiscription] = useState("");

  // Function to handle changes in the editor content

  const { Productname, quantity, price, category } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };
  const setImage = (e) => {
    setProductimage(e.target.files[0]);
    setPreviwImage(URL.createObjectURL(e.target.files[0]));
  };

  const SKU = (category) => {
    const number = category.slice(0, 3).toUpperCase();
    const date = Date.now();
    const sku = number + "-" + date;
    return sku;
  };

  const productUpload = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("Productname", Productname);
    form.append("sku", SKU(category));
    form.append("category", category);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("image", image);
    form.append("description", description);
    console.log(...form);

    await dispatch(createProduct(form));
  };

  return (
    <>
      <ProductItem
        formData={formData}
        image={image}
        previewImage={previewImage}
        description={description}
        handleChange={handleChange}
        setImage={setImage}
        setDiscription={setDiscription}
        productUpload={productUpload}
      />
    </>
  );
};

export default Productss;
