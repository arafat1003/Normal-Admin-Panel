import { Button, Grid } from "@mui/material";
import React from "react";
import Layout from "../../component/layout/layout";
import Sidebar from "../../component/sidebar/sidebar";
import Productss from "../../component/product/product";
import UserInformation from "../../component/Userinformation/userInformation";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Footer from "../../component/footer/footer";

const Dashboard = (props) => {
  const { children } = props;
  return (
    <Grid container direction="row">
      <Grid lg={props.isOpen ? 2 : 1} item>
        <Sidebar
          isOpen={props.isOpen}
          SetisOpen={props.SetisOpen}
          handletheClick={props.handletheClick}
        />
      </Grid>
      <Grid lg={props.isOpen ? 10 : 11} item>
        <Layout />
        <Outlet />
        {children}

        <Footer />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
