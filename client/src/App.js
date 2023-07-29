import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./pages/home";
import Login from "./auth/login";
import Register from "./auth/Register";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Sidebar from "./component/sidebar/sidebar";
import Layout from "./component/layout/layout";
import Dashboard from "./pages/dashboard/dashboard";
import { useDispatch } from "react-redux";
import { loginStatus } from "./configuration/authconfiguration";
import { SET_LOGIN } from "./redux/features/authSlicer";
import Productss from "./component/product/product";
import UserInformation from "./component/Userinformation/userInformation";
import Footer from "./component/footer/footer";
import Subdashboard from "./pages/dashboard/subdashboard";
import ProductSlice from "./configuration/productConfiguration";
import SinglePro from "./component/Singleproducts/SinglePro";
import ProductEdit from "./component/ProductEdit/productEdit";
import ProfileDetails from "./component/Profile/ProfileDetails";
import EditProfile from "./component/Profile/EditProfile";
const dotenv = require("dotenv").config();
axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function login() {
      const status = await loginStatus();
      dispatch(SET_LOGIN(status));
      const product = await ProductSlice.Allproducts();
      return product;
      console.log(status);
    }
    login();
  }, [dispatch]);
  const [isOpen, SetisOpen] = useState(true);

  const handletheClick = () => {
    SetisOpen(!isOpen);
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot/:hashToken" element={<Forgot />} />
        <Route path="/resetPassword" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        <Route
          path="/dashboards"
          element={
            <Dashboard
              isOpen={isOpen}
              SetisOpen={SetisOpen}
              handletheClick={handletheClick}
            />
          }
        >
          <Route index element={<UserInformation />} />
          <Route path="products" element={<Productss />} />
          <Route path="info" element={<Subdashboard />} />
          <Route path="singleProduct/:id" element={<SinglePro />} />
          <Route path="editProduct/:id" element={<ProductEdit />} />
          <Route path="profile" element={<ProfileDetails />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
