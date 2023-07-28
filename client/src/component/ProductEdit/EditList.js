import {
  Button,
  Card,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const EditList = ({
  productEdit,
  previewImage,
  description,
  setDiscription,
  handleChange,
  setImage,
  productUpload,
}) => {
  return (
    <>
      <Grid
        sx={{
          "& 	.MuiCard-root": {
            padding: "10px",
            border: "1px solid black",
            margin: "5px",
          },
          "& .MuiTypography-root": {
            marginBottom: "5px",
          },
        }}
        conatiner
        direction="column"
      >
        <Typography variant="h3">
          Please submit your Data or information here{" "}
        </Typography>
        <form onSubmit={productUpload}>
          <Card>
            <Typography variant="body2">Submit your Photo here:</Typography>
            <Typography variant="p">
              file format should be in jpg ,png ete
            </Typography>
            <TextField fullWidth type="file" onChange={setImage} name="image" />
            {previewImage != null ? (
              <img style={{ maxHeight: "30vh" }} src={previewImage}></img>
            ) : (
              <Typography variant="body1">No picture is selected</Typography>
            )}
          </Card>
          <Card>
            <Typography variant="body2">Product Name</Typography>
            <TextField
              fullWidth
              type="text"
              name="Productname"
              value={productEdit.Productname}
              onChange={handleChange}
              label="product Name"
            />
          </Card>
          <Card>
            <Typography variant="body2">Category</Typography>
            <TextField
              fullWidth
              type="text"
              name="category"
              value={productEdit.category}
              onChange={handleChange}
              label="Category"
            />
          </Card>
          <Card>
            <Typography variant="body2">Quantity</Typography>
            <TextField
              fullWidth
              type="text"
              name="quantity"
              value={productEdit.quantity}
              onChange={handleChange}
              label="Quantity"
            />
          </Card>
          <Card>
            <Typography variant="body2">Price</Typography>
            <TextField
              fullWidth
              type="number"
              name="price"
              value={productEdit.price}
              onChange={handleChange}
              label="Price"
            />
          </Card>
          <Card>
            <Typography variant="body2">Description</Typography>
            <ReactQuill value={description} onChange={setDiscription} />
          </Card>

          <Button fullWidth variant="contained" type="submit">
            Click to submit your data
          </Button>
        </form>
      </Grid>
    </>
  );
};

export default EditList;
