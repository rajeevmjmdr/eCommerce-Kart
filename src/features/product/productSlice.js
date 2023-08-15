import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, getAllBrands, getAllCategories, getAllProducts , getProductsByFilter, getProductById, updateProduct} from './productAPI';

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

export const getProductByIdAsync = createAsyncThunk(
  'product/getProductById',
  async (id) => {
    const response = await getProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
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
      .addCase(getProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(item=> item.id===action.payload.id)
        state.products[index] = action.payload;
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
