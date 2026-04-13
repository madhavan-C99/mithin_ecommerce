import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import uiReducer from "./UiSlice"
import wishlistReducer from "./WishListSlice";
import deliveryReducer from "./DeliverySlice";
import distanceNotifyReducer from "./DistanceNotifySlice";
import orderReducer from "./OrderSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    wishlist: wishlistReducer,
    delivery: deliveryReducer,
    distanceNotify: distanceNotifyReducer,
    order: orderReducer,
  },
});

/*
  Persist cart to localStorage
*/
// store.subscribe(() => {
//   try {
//     const state = store.getState();
//     localStorage.setItem("cart", JSON.stringify(state.cart.items));
//   } catch (error) {
//     console.error("Failed to save cart to storage");
//   }
// });