import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductSlice from "../../configuration/productConfiguration";
import { toast } from "react-toastify";

const initialState = {
  product: [],

  products: [],

  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkApi) => {
    try {
      return await ProductSlice.productCreate(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const ALLProduct = createAsyncThunk(
  "products/all",
  async (_, thunkApi) => {
    try {
      const response = await ProductSlice.Allproducts();

      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const Product_del = createAsyncThunk(
  "products/delete",
  async (id, thunkApi) => {
    try {
      const response = await ProductSlice.DELproducts(id);

      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const Product_Single = createAsyncThunk(
  "products/single",
  async (id, thunkApi) => {
    try {
      const response = await ProductSlice.getSingleproducts(id);
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const CREATE_product = createAsyncThunk(
  "products/edit",
  async ({ id, formData }, thunkApi) => {
    try {
      const response = await ProductSlice.Editproducts(id, formData);
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const productSlicer = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(action, payload) {
      console.log("store value");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.products.push(action.payload);
        toast.success("product addded successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        console.log(action.payload);
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(ALLProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ALLProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.products = action.payload;
      })
      .addCase(ALLProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        console.log(action.payload);
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(Product_del.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Product_del.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        toast.success("product Deleted successfully");
      })
      .addCase(Product_del.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        console.log(action.payload);
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(Product_Single.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Product_Single.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
        console.log(state.product);
      })
      .addCase(Product_Single.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        console.log(action.payload);
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(CREATE_product.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CREATE_product.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        roast.success("Productr have been changed Successfully");
        console.log(state.product);
      })
      .addCase(CREATE_product.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        console.log(action.payload);
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE } = productSlicer.actions;

export const isLoadingProduct = (state) => {
  return state.product.isLoading; // Return the isLoading property from the state.product object
};

export const singleProduct = (state) => {
  return state.product.product; // Return the product property from the state.product object
};

export default productSlicer.reducer;
