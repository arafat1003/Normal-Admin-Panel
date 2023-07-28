import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ReactPaginate from "react-paginate";
import {
  FilterTheProduct,
  Filter_PRODUCTS,
} from "../../redux/productSlicer/filterSlicer";
import SearchBar from "../../component/searchBar/searchBar";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Modal from "@mui/material/Modal";

import {
  ALLProduct,
  Product_del,
} from "../../redux/productSlicer/productSlicer";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProductItem = ({ products, isLoading }) => {
  const dispatch = useDispatch();
  const filterProducts = useSelector(FilterTheProduct);
  const [seletedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [productsFetched, setProductsFetched] = useState(false);
  const ITEMS_PER_PAGE = 2; // Number of items to display per page
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Calculate the number of total pages
  const totalPages = Math.ceil(filterProducts.length / ITEMS_PER_PAGE);

  // Get the current page's products
  const getProductsForPage = (pageNumber) => {
    const startIdx = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    return filterProducts.slice(startIdx, endIdx);
  };

  // Get the current page's products
  const currentProducts = getProductsForPage(currentPage);

  const subText = (text, n) => {
    if (text.length > n) {
      const shortentext = text.substring(0, n).concat("...");
      return shortentext;
    }
    return text;
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };

  const handleDeleteButton = () => {
    if (seletedId) {
      dispatch(Product_del(seletedId));
      console.log(seletedId);
      setSelectedId(null);
      console.log(seletedId);
      dispatch(ALLProduct());
      handleClose();
    }
  };

  const handleClick = () => {
    setSearch("");
    console.log("clicked the clear icon...");
  };

  useEffect(() => {
    dispatch(Filter_PRODUCTS({ products, search }));
  }, [dispatch, products, search]);

  return (
    <>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4">Here the list of your product</Typography>
        </Grid>
        <Grid item>
          <SearchBar
            search={search}
            handleChange={handleChange}
            handleClick={handleClick}
            showClearIcon={showClearIcon}
          />
        </Grid>
      </Grid>
      {filterProducts.length === 0 ? (
        <p>No product is here, Please Add some Products</p>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>s/n</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Button</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts.map((product, index) => {
                const { _id, Productname, category, quantity, price } = product;

                return (
                  <StyledTableRow key={_id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Productname}
                    </StyledTableCell>

                    <StyledTableCell align="right">{category}</StyledTableCell>
                    <StyledTableCell align="right">{quantity}</StyledTableCell>
                    <StyledTableCell align="right">{price}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Link to={`/dashboards/singleProduct/${_id}`}>
                        <IconButton>
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                      <Link to={`/dashboards/editproduct/${_id}`}>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => {
                          setSelectedId(_id);
                          handleOpen();
                        }}
                      >
                        <DeleteIcon color="red" />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure ,You want to delete this
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            If you really want to delete this , press this delete button
          </Typography>
          <Grid container justifyContent="space-between" direction="row">
            <Grid item>
              <Button variant="contained" onClick={handleDeleteButton}>
                {" "}
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleClose} variant="contained">
                {" "}
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Box
        justifyContent="center"
        alignItems="center"
        marginTop="2rem"
        display="flex"
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </>
  );
};

export default ProductItem;
