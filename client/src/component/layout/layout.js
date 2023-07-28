import React from "react";
import { Grid } from "@mui/material";
import Header from "../Header/header";

import "../style/layout.css";

const Layout = ({ children }) => {
  return (
    <Grid className="maincontainer" container direction="column">
      <Header />
      <Grid item>
        <Grid sx={{}} container>
          <main>{children}</main>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
