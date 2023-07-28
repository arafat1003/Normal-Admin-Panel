import React, { useEffect } from "react";
import Redirectpath from "../redirectRoute/redirectRoute";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isloggedInn } from "../../redux/features/authSlicer";
import {
  Product_Single,
  singleProduct,
} from "../../redux/productSlicer/productSlicer";
import { Grid, Typography } from "@mui/material";
import "../Singleproducts/single.css";
import DOMPurify from "dompurify";

const SinglePro = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const isLoggedin = useSelector(isloggedInn);

  const { product, isError, isLoading, message } = useSelector(
    (state) => state.product
  );
  console.log(product);

  useEffect(() => {
    if (isLoggedin === true) {
      dispatch(Product_Single(id));
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedin, dispatch, isError, message, id]);
  return (
    <Grid container justifyContent="center" direction="row">
      <Grid item lg={8}>
        <Grid container paddingLeft="10px" spacing={4} direction="column">
          <Grid item>
            <Typography variant="h5">
              Your Product Name:
              <span
                style={{
                  color: "red",
                  marginLeft: "5px",
                }}
                className="span-4"
              >
                {product.Productname}
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              Your Category:
              <span
                style={{
                  color: "red",
                  marginLeft: "5px",
                }}
                className="span-4"
              >
                {product.category}
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              Your SKU:
              <span
                style={{
                  color: "red",
                  marginLeft: "5px",
                }}
                className="span-4"
              >
                {product.sku}
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              Your quantity:
              <span
                style={{
                  color: "red",
                  marginLeft: "5px",
                }}
                className="span-4"
              >
                {product.quantity}
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              Your Price:
              <span
                style={{
                  color: "red",
                  marginLeft: "5px",
                }}
                className="span-4"
              >
                {product.price}
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <div>
              {" "}
              <Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.description),
                  }}
                ></div>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4}>
        {product.image && product.image.filePath ? (
          <img
            style={{
              width: "400px",
              height: "100%",
              outline: "3px solid red",
              padding: "5px",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
            className="img-4"
            src={product.image.filePath}
            alt={product.image.fileName}
          />
        ) : (
          <p>No image set for this product</p>
        )}
      </Grid>
    </Grid>
  );
};

export default SinglePro;
