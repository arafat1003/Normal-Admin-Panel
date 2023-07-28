import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ALLProduct,
  CALC_STORE_VALUE,
  isLoadingProduct,
} from "../../redux/productSlicer/productSlicer";
import { isloggedInn } from "../../redux/features/authSlicer";
import { loginStatus } from "../../configuration/authconfiguration";
import ProductItem from "./productItem";
import Redirectpath from "../../component/redirectRoute/redirectRoute";
import { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import InfoBox from "./infoBox/infoBox";
import { Grid } from "@mui/material";
import {
  FilterTheProduct,
  TotalAllValue,
  CALC_VALUE_FILTER,
  CALC_OUT_OF_STOCK,
  ProductoutOfStock,
  ALLctaegory,
  CALC_CATEGORY,
} from "../../redux/productSlicer/filterSlicer";

const Subdashboard = () => {
  const dispatch = useDispatch();
  const isLoggedin = useSelector(isloggedInn);
  const filterProducts = useSelector(FilterTheProduct);
  const totalValue = useSelector(TotalAllValue);
  const categorys = useSelector(ALLctaegory);

  const outofstock = useSelector(ProductoutOfStock);

  const { products, isError, isLoading, message } = useSelector(
    (state) => state.product
  );
  let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    if (isLoggedin === true) {
      dispatch(ALLProduct());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedin, dispatch, isError, message, products]);
  useEffect(() => {
    dispatch(CALC_VALUE_FILTER(filterProducts));
    dispatch(CALC_OUT_OF_STOCK(filterProducts));
    dispatch(CALC_CATEGORY(filterProducts));
  }, [dispatch, filterProducts]);

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        marginBottom="20px"
        paddingRight="10px"
      >
        <Grid item lg={3}>
          <InfoBox
            name={"Total Products"}
            price={products.length}
            Bgcolor={"#d41197"}
            Bg={"white"}
            icon={<ShoppingCartIcon sx={{ fontSize: 60 }} />}
          />
        </Grid>
        <Grid item lg={3}>
          <InfoBox
            name={"Total Store Value"}
            price={dollarUS.format(totalValue)}
            Bgcolor={"green"}
            Bg={"white"}
            icon={<RemoveShoppingCartIcon sx={{ fontSize: 60 }} />}
          />
        </Grid>
        <Grid item lg={3}>
          <InfoBox
            name={"Out of stock"}
            price={outofstock}
            Bgcolor={"red"}
            Bg={"white"}
            icon={<AttachMoneyIcon sx={{ fontSize: 60 }} />}
          />
        </Grid>
        <Grid item lg={3}>
          <InfoBox
            name={"All categories"}
            price={categorys.length}
            Bgcolor={"blue"}
            Bg={"white"}
            icon={<CategoryIcon sx={{ fontSize: 60 }} />}
          />
        </Grid>
      </Grid>
      <ProductItem products={products} isLoading={isLoading} />
    </>
  );
};

export default Subdashboard;
