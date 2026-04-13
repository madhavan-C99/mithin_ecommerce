import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartDrawerOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCartDrawer: (state) => {
      state.cartDrawerOpen = true;
    },
    closeCartDrawer: (state) => {
      state.cartDrawerOpen = false;
    },
  },
});

export const { openCartDrawer, closeCartDrawer } = uiSlice.actions;
export default uiSlice.reducer;