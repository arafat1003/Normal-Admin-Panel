import axios from "axios";
import { toast } from "react-toastify";

const BackEND_URL = "http://localhost:5000";

const product_api = `${BackEND_URL}/v1/product/posting`;
const All_product = `${BackEND_URL}/v1/product/allrouter`;

const DELETE_API = `${BackEND_URL}/v1/product/`;
const UPDATE_PRO = `${BackEND_URL}/v1/product/updated/`;

const productCreate = async (userData) => {
  const response = await axios.post(product_api, userData);

  return response.data;
};
const Allproducts = async () => {
  const response = await axios.get(All_product);
  console.log(response.data);
  return response.data;
};

const DELproducts = async (id) => {
  const response = await axios.delete(DELETE_API + id);

  return response.data;
};
const getSingleproducts = async (id) => {
  const response = await axios.get(DELETE_API + id);
  console.log(response.data);
  return response.data;
};
const Editproducts = async (id, formData) => {
  const response = await axios.get(`${UPDATE_PRO}${id}`, formData);
  console.log(response.data);
  return response.data;
};
const ProductSlice = {
  productCreate,
  Allproducts,
  DELproducts,
  getSingleproducts,
  Editproducts,
};

export default ProductSlice;
