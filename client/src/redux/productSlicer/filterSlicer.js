import { ListItem } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterproducts: [],
  totalValue: "",
  outOfstock: 0,
  categorys: [],
};

const productSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    Filter_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.Productname.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filterproducts = tempProducts;
    },
    CALC_VALUE_FILTER(state, action) {
      const filterproducts = action.payload;
      let array = [];
      filterproducts.map((item) => {
        const { price, quantity } = item;
        const productValue = price * quantity;
        return array.push(productValue);
      });
      const totalValues = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalValue = totalValues;
    },
    CALC_OUT_OF_STOCK(state, action) {
      const filterproducts = action.payload;
      let array = [];
      filterproducts.map((item) => {
        const { quantity } = item;

        return array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number === "0") {
          count += 1;
        }
      });
      state.outOfstock = count;
    },
    CALC_CATEGORY(state, action) {
      const filterproducts = action.payload;

      let array = [];
      filterproducts.map((item) => {
        const { category } = item;

        array.push(category);
      });

      const Newcategory = [...new Set(array)];
      state.categorys = Newcategory;
    },
  },
});

export const {
  Filter_PRODUCTS,
  CALC_VALUE_FILTER,
  CALC_OUT_OF_STOCK,
  CALC_CATEGORY,
} = productSlice.actions;

export const ALLctaegory = (state) => state.filter.categorys;

export const ProductoutOfStock = (state) => state.filter.outOfstock;

export const FilterTheProduct = (state) => state.filter.filterproducts;

export const TotalAllValue = (state) => state.filter.totalValue;
export default productSlice.reducer;
