import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  setItemLoading
} from "./CartSlice";

import {
  updateCartItemQuantity,
  deleteCartItem,
  clearCartApi
} from "../api/AllApi";

import { classifyCartResponse } from "./ApiSTockHandlerResponse";
import { showNotification } from "./DistanceNotifySlice";

// /*
// INCREMENT
// */
// export const incrementCartItem = (cartKey) => async (dispatch, getState) => {

//   const state = getState();
//   const item = state.cart.items.find(i => i.cartKey === cartKey);

//   if (!item) return;

//   if (state.cart.loading.items[cartKey]?.increment) return;

//   dispatch(setItemLoading({ cartKey, type: "increment", value: true }));

//   try {

//     dispatch(increaseQuantity(cartKey));

//     const userId = JSON.parse(localStorage.getItem("user"))?.user_id;

//     await updateCartItemQuantity({
//       user_id: userId,
//       product_id: item.productId,
//       cart_item_id: item.cart_item_id,
//       quantity: item.quantity + 1,
//       total_price: item.price * item.weight * (item.quantity + 1)
//     });

//   } catch (err) {

//     dispatch(decreaseQuantity(cartKey));

//   } finally {

//     dispatch(setItemLoading({ cartKey, type: "increment", value: false }));

//   }
// };


/*
INCREMENT
*/
export const incrementCartItem = (cartKey) => async (dispatch, getState) => {

  const state = getState();
  const item = state.cart.items.find(i => i.cartKey === cartKey);

  if (!item) return;

  if (state.cart.loading.items[cartKey]?.increment) return;

  dispatch(setItemLoading({ cartKey, type: "increment", value: true }));

  try {

    // ✅ calculate before dispatch (avoid stale state bug)
    const newQuantity = item.quantity + 1;

    // optimistic update
    dispatch(increaseQuantity(cartKey));

    const userId = JSON.parse(localStorage.getItem("user"))?.user_id;

    const res = await updateCartItemQuantity({
      user_id: userId,
      product_id: item.productId,
      cart_item_id: item.cart_item_id,
      quantity: newQuantity,
      total_price: item.price * item.weight * newQuantity
    });

    // ✅ classify backend response
    const result = classifyCartResponse(res?.message);

    // ✅ handle stock error (your requirement)
    if (result?.code === "STOCK_LIMIT" || result === "STOCK_ERROR") {

      // rollback UI
      dispatch(decreaseQuantity(cartKey));

      // show notification
      dispatch(showNotification({
        message: res.message,
        severity: "error"
      }));

      return; // 🚨 stop further execution
    }

  } catch (err) {

    // network / real error rollback
    dispatch(decreaseQuantity(cartKey));

  } finally {

    dispatch(setItemLoading({ cartKey, type: "increment", value: false }));

  }
};


/*
DECREMENT
*/
export const decrementCartItem = (cartKey) => async (dispatch, getState) => {

  const state = getState();
  const item = state.cart.items.find(i => i.cartKey === cartKey);

  if (!item) return;

  if (state.cart.loading.items[cartKey]?.decrement) return;

  dispatch(setItemLoading({ cartKey, type: "decrement", value: true }));

  try {

    if (item.quantity > 1) {

      dispatch(decreaseQuantity(cartKey));

      const userId = JSON.parse(localStorage.getItem("user"))?.user_id;

      await updateCartItemQuantity({
        user_id: userId,
        product_id: item.productId,
        cart_item_id: item.cart_item_id,
        quantity: item.quantity - 1,
        total_price: item.price * item.weight * (item.quantity - 1)
      });

    } else {

      dispatch(removeFromCart(cartKey));

      const userId = JSON.parse(localStorage.getItem("user"))?.user_id;

      await deleteCartItem({
        user_id: userId,
        cart_item_id: item.cart_item_id
      });

    }

  } catch (err) {

    // rollback
    dispatch(increaseQuantity(cartKey));

  } finally {

    dispatch(setItemLoading({ cartKey, type: "decrement", value: false }));

  }
};


/*
REMOVE ITEM
*/
export const removeCartItem = (cartKey) => async (dispatch, getState) => {

  const state = getState();
  const item = state.cart.items.find(i => i.cartKey === cartKey);

  if (!item) return;

  if (state.cart.loading.items[cartKey]?.delete) return;

  dispatch(setItemLoading({ cartKey, type: "delete", value: true }));

  try {

    dispatch(removeFromCart(cartKey));

    const userId = JSON.parse(localStorage.getItem("user"))?.user_id;

    await deleteCartItem({
      user_id: userId,
      cart_item_id: item.cart_item_id
    });

  } catch (err) {

    // rollback not handled here (edge case)

  } finally {

    dispatch(setItemLoading({ cartKey, type: "delete", value: false }));

  }
};


/*
CLEAR CART
*/
export const clearCartAsync = () => async (dispatch) => {

  dispatch({ type: "cart/setGlobalLoading", payload: true });

  try {

    dispatch(clearCart());

    const userId = JSON.parse(localStorage.getItem("user"))?.user_id;

    await clearCartApi({ user_id: userId });

  } catch (err) {

    // rollback not handled

  } finally {

    dispatch({ type: "cart/setGlobalLoading", payload: false });

  }
};