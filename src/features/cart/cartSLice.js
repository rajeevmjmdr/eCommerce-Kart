import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, getItemsByUserId, updateCart } from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
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
  async (userId) => {
  const response = await getItemsByUserId(userId);
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
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(item=> item.id===action.payload.id)
        state.items[index] = action.payload;
      });
  }
  });

export const selectitems = (state) => state.cart.items;

export default cartSlice.reducer;
