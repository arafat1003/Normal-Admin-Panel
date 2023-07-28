import React from "react";
import { AppBar, Toolbar, Tabs, Tab, Container } from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { useSelector } from "react-redux";
import { isloggedInn } from "../redux/features/authSlicer";

const Appbar = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const isLoggedin = useSelector(isloggedInn);
  console.log(isLoggedin);
  return (
    <AppBar
      sx={{
        backgroundColor: "#0a1930",
      }}
    >
      <Container>
        <Toolbar>
          <ProductionQuantityLimitsIcon />

          <Tabs
            sx={{
              marginLeft: "auto",
              "& 	.MuiTab-root": {
                color: "white",
              },
            }}
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab
              value="one"
              label="Register"
              wrapped
              sx={{
                display: isLoggedin ? "none" : "block",
              }}
            />
            <Tab value="two" label="Login" />
            <Tab value="three" label="Dashboard" />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;
