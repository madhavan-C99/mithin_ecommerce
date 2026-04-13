import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    activeOrderCount: 0,
  },
  reducers: {
    setActiveOrderCount: (state, action) => {
      state.activeOrderCount = action.payload;
    },
  },
});

export const { setActiveOrderCount } = orderSlice.actions;
export default orderSlice.reducer;