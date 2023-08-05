import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllProducts , getProductsByFilter} from './productAPI';

const initialState = {
  products: [],
  status: 'idle',
  totalItems:0
};

export const getAllProductsAsync = createAsyncThunk(
  'product/getAllProducts',
  async () => {
    const response = await getAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getProductsByFilterAsync = createAsyncThunk(
  'product/getProductsByFilter',
  async ({filter,sort,pagination}) => {
    const response = await getProductsByFilter({filter,sort,pagination});
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(getProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
