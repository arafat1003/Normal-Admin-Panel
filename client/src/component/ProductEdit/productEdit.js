import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  CREATE_product,
  Product_Single,
  singleProduct,
} from "../../redux/productSlicer/productSlicer";
import { useEffect } from "react";
import EditList from "./EditList";
import ProductItem from "../product/ProductItem";

const formDatait = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formDatas = useSelector(singleProduct);
  console.log(formDatas);
  const [formData, setFormdata] = useState(formDatas);
  const [image, setProductimage] = useState("");
  const [previewImage, setPreviwImage] = useState(null);
  const [description, setDiscription] = useState("");

  useEffect(() => {
    dispatch(Product_Single(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };
  const setImage = (e) => {
    setProductimage(e.target.files[0]);
    setPreviwImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    setFormdata(formDatas);

    setPreviwImage(
      formDatas && formData.image ? `${formData.image.filePath}` : null
    );
    setDiscription(
      formDatas && formData.description ? formData.description : null
    );
  }, [formDatas]);
  const productUpload = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("Productname", formData && formData.Productname);
    form.append("category", formData && formData.category);
    form.append("price", formData && formData.price);
    form.append("quantity", formData.quantity);
    if (image) {
      form.append("image", image);
    }
    form.append("description", description);
    console.log(...form);

    dispatch(CREATE_product({ id, form }));
    dispatch(Product_Single(id));
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

export default formDatait;
