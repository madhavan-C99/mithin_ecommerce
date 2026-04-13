import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  severity: "info"
};

const DistanceNotifySlice = createSlice({
  name: "notification",
  initialState,
  reducers: {

    showNotification: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || "info";
    },

    closeNotification: (state) => {
      state.open = false;
    }

  }
});

export const { showNotification, closeNotification } =
  DistanceNotifySlice.actions;

export default DistanceNotifySlice.reducer;