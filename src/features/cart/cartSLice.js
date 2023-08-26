import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteItemFromCart, getItemsByUserId, resetCart, updateCart } from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
  cartLoaded:false
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart", 
  async (item) => {
  const response = await addToCart(item);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const getItemsByUserIdAsync = createAsyncThunk(
  "cart/getItemsByUserId", 
  async () => {
  const response = await getItemsByUserId();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart", 
  async (update) => {
  const response = await updateCart(update);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart", 
  async (itemId) => {
  const response = await deleteItemFromCart(itemId);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart", 
  async () => {
  const response = await resetCart();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(getItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(getItemsByUserIdAsync.rejected, (state, action) => {
        state.status = "error";
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(item=> item.id===action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(item=> item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });

  }
  });

export const selectitems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;
