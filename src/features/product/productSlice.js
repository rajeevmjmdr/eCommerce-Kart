import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllBrands, getAllCategories, getAllProducts , getProductsByFilter, getProductsById} from './productAPI';

const initialState = {
  products: [],
  categories: [],
  brands: [],
  selectedProduct:null,
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

export const getAllCategoriesAsync = createAsyncThunk(
  'product/getAllCategories',
  async () => {
    const response = await getAllCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getAllBrandsAsync = createAsyncThunk(
  'product/getAllBrands',
  async () => {
    const response = await getAllBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getProductsByIdAsync = createAsyncThunk(
  'product/getProductsById',
  async (id) => {
    const response = await getProductsById(id);
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
      })
      .addCase(getAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload.categories;
      })
      .addCase(getAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload.brands;
      })
      .addCase(getProductsByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      });
  },
  },
);

export const selectAllProducts = (state) => state.product.products;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
