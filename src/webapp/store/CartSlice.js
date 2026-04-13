// // carslice.js

// import { createSlice } from "@reduxjs/toolkit";

// import { addCartItem, updateCartItemQuantity, deleteCartItem, clearCartApi } from "../api/AllApi";

// /*
// Generate unique cart key
// product + weight + unit
// */
// const generateCartKey = (item) => {
//   return `${item.productId}_${item.weight}_${item.unit || "kg"}`;
// };

// /*
// Load cart safely from localStorage
// Also ensures every item has a cartKey
// */
// const loadCartFromStorage = () => {
//   try {
//     const cart = localStorage.getItem("cart");
//     const parsed = cart ? JSON.parse(cart) : [];

//     return parsed.map((item) => ({
//       ...item,
//       unit: item.unit || "kg",
//       cartKey: item.cartKey || generateCartKey(item),
//     }));
//   } catch {
//     return [];
//   }
// };

// // const initialState = {
// //   items: loadCartFromStorage(),
// // };

// const initialState = {
//   items: loadCartFromStorage(),
//   loading: {
//     items: {},
//     global: false
//   }
// };


// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {


// //     addToCart: (state, action) => {
// //   const item = action.payload;

// //   const cartKey = generateCartKey(item);

// //   const existingItem = state.items.find(
// //     (product) => product.cartKey === cartKey
// //   );

// //   if (existingItem) {
// //     existingItem.quantity += 1;
// //   } else {
// //     state.items.push({
// //       ...item,
// //       unit: item.unit || "kg",
// //       quantity: 1,
// //       cartKey,
// //     });
// //   }

// //   localStorage.setItem("cart", JSON.stringify(state.items));

// //   // /*
// //   // Backend Sync
// //   // */
// //   // try {

// //   //   const userData = JSON.parse(localStorage.getItem("user"));
// //   //   const userId = userData?.user_id;

// //   //   if (!userId) return;

// //   //   const payload = {
// //   //     user_id: userId,
// //   //     product_id: item.productId,
// //   //     weight: item.weight,
// //   //     unit_price: item.price,
// //   //     quantity: 1,
// //   //     total_price: item.price * item.weight
// //   //   };

// //   //   addCartItem(payload);
// //   //   console.log("ADD TO CART BUTTON", payload)

// //   // } catch (error) {
// //   //   console.error("Add cart API failed", error);
// //   // }

// // //   try {

// // //   const userData = JSON.parse(localStorage.getItem("user"));
// // //   const userId = userData?.user_id;

// // //   if (!userId) return;

// // //   const payload = {
// // //     user_id: userId,
// // //     product_id: item.productId,
// // //     weight: item.weight,
// // //     unit_price: item.price,
// // //     quantity: 1,
// // //     total_price: item.price * item.weight
// // //   };

// // //   addCartItem(payload).then((response) => {

// // //     // const cartItemId = response?.data?.cart_item_id;
// // //     const cartItemId = response?.data?.data?.cart_item_id;

// // //     if (!cartItemId) return;

// // //     const cartItem = state.items.find(
// // //       (product) => product.cartKey === cartKey
// // //     );

// // //     if (cartItem) {
// // //       cartItem.cart_item_id = cartItemId;
// // //       localStorage.setItem("cart", JSON.stringify(state.items));
// // //     }

// // //   });
// // //     console.log("delete cart item", payload)

// // // } catch (error) {
// // //   console.error("Add cart API failed", error);
// // // }

// // try {

// //   const userData = JSON.parse(localStorage.getItem("user"));
// //   const userId = userData?.user_id;

// //   if (!userId) return;

// //   const payload = {
// //     user_id: userId,
// //     product_id: item.productId,
// //     weight: item.weight,
// //     unit_price: item.price,
// //     quantity: 1,
// //     total_price: item.price * item.weight
// //   };

// //   addCartItem(payload).then((response) => {

// //     const cartItemId = response?.data?.data?.cart_item_id;

// //     if (!cartItemId) {
// //       console.log("cart_item_id not returned from API");
// //       return;
// //     }

// //     const cartItem = state.items.find(
// //       (product) => product.cartKey === cartKey
// //     );

// //     if (cartItem) {
// //       cartItem.cart_item_id = cartItemId;

// //       console.log("Cart item updated with cart_item_id:", cartItemId);

// //       localStorage.setItem("cart", JSON.stringify(state.items));
// //     }

// //   });

// // } catch (error) {
// //   console.error("Add cart API failed", error);
// // }
// // },









// addToCart: (state, action) => {

//   const item = action.payload;

//   const cartKey = generateCartKey(item);

//   const existingItem = state.items.find(
//     (product) => product.cartKey === cartKey
//   );

//   if (existingItem) {
//     existingItem.quantity += 1;
//   } else {
//     state.items.push({
//       ...item,
//       unit: item.unit || "kg",
//       quantity: 1,
//       cartKey,
//     });
//   }
//   console.log("Add to cart output", item)

//   localStorage.setItem("cart", JSON.stringify(state.items));
// },










//     increaseQuantity: (state, action) => {

//   const item = state.items.find(
//     (product) => product.cartKey === action.payload
//   );

//   if (!item) return;

//   item.quantity += 1;

//   localStorage.setItem("cart", JSON.stringify(state.items));

//   /*
//   Backend Sync
//   */
//   try {

//     const userData = JSON.parse(localStorage.getItem("user"));
//     const userId = userData?.user_id;

//     if (!userId) return;

//     const payload = {
//       user_id: userId,
//       product_id: item.productId,
//       cart_item_id: item.cart_item_id,
//       quantity: item.quantity,
//       total_price: item.price * item.weight * item.quantity
//     };

//     // updateCartItemQuantity(payload);
//     console.log("UPDATE CART ITEM INCREMENT BUTTON", payload)

//   } catch (error) {
//     console.error("Update quantity API failed", error);
//   }
// },



// //     decreaseQuantity: (state, action) => {

// //   const item = state.items.find(
// //     (product) => product.cartKey === action.payload
// //   );

// //   if (!item) return;

// //   if (item.quantity > 1) {

// //     item.quantity -= 1;

// //     try {

// //       const userData = JSON.parse(localStorage.getItem("user"));
// //       const userId = userData?.user_id;

// //       if (!userId) return;

// //       const payload = {
// //         user_id: userId,
// //         product_id: item.productId,
// //         cart_item_id: item.cart_item_id,
// //         quantity: item.quantity,
// //         total_price: item.price * item.weight * item.quantity
// //       };

// //       updateCartItemQuantity(payload);
// //        console.log("UPDATE CART ITEM DECREMENT BUTTON", payload)

// //     } catch (error) {
// //       console.error("Update quantity API failed", error);
// //     }

// //   } else {

// //     state.items = state.items.filter(
// //       (product) => product.cartKey !== action.payload
// //     );

// //   }

// //   localStorage.setItem("cart", JSON.stringify(state.items));
// // },









// decreaseQuantity: (state, action) => {

//   const item = state.items.find(
//     (product) => product.cartKey === action.payload
//   );

//   if (!item) return;

//   if (item.quantity > 1) {

//     item.quantity -= 1;

//     try {

//       const userData = JSON.parse(localStorage.getItem("user"));
//       const userId = userData?.user_id;

//       if (!userId) return;

//       if (!item.cart_item_id) {
//         console.warn("Missing cart_item_id → skipping update");
//         return;
//       }

//       const payload = {
//          user_id: userId,
//          product_id: item.productId,
//         cart_item_id: item.cart_item_id,   // ✅ FIXED
//         quantity: item.quantity,
//         total_price: item.price * item.weight * item.quantity
//       };

//       // updateCartItemQuantity(payload);
//       console.log("UPDATE CART ITEM DECREMENT BUTTON", payload)

//     } catch (error) {
//       console.error("Update quantity API failed", error);
//     }

//   } else {

//     const cartItemId = item.cart_item_id;

//     state.items = state.items.filter(
//       (product) => product.cartKey !== action.payload
//     );

//     localStorage.setItem("cart", JSON.stringify(state.items));

//     try {

//       const userData = JSON.parse(localStorage.getItem("user"));
//       const userId = userData?.user_id;

//       if (!userId) return;

//       if (!cartItemId) {
//         console.warn("Missing cart_item_id → delete skipped");
//         return;
//       }

//       const payload = {
//         user_id: userId,
//         cart_item_id: cartItemId
//       };

//       // deleteCartItem(payload);   // ✅ FIXED

//     } catch (error) {
//       console.error("Delete cart item API failed", error);
//     }

//   }

//   localStorage.setItem("cart", JSON.stringify(state.items));
// },









// //   removeFromCart: (state, action) => {

// //   const cartKey = action.payload;
// //   console.log("DELETE CLICKED cartKey:", cartKey);

// //   const item = state.items.find(
// //     (product) => product.cartKey === cartKey
// //   );

// //   console.log("FOUND ITEM:", item);

// //   if (!item) {
// //     console.log("Item not found in Redux state");
// //     return;
// //   }

// //   const cartItemId = item.cart_item_id;
// //   console.log("cart_item_id:", cartItemId);

// //   state.items = state.items.filter(
// //     (product) => product.cartKey !== cartKey
// //   );

// //   localStorage.setItem("cart", JSON.stringify(state.items));

// //   try {

// //     const userData = JSON.parse(localStorage.getItem("user"));
// //     const userId = userData?.user_id;

// //     console.log("USER ID:", userId);

// //     if (!userId) {
// //       console.log("User ID missing");
// //       return;
// //     }

// //     if (!cartItemId) {
// //       console.log("cart_item_id missing → API not called");
// //       return;
// //     }

// //     const payload = {
// //       user_id: userId,
// //       cart_item_id: cartItemId
// //     };

// //     console.log("DELETE API PAYLOAD:", payload);

// //     deleteCartItem(payload);

// //   } catch (error) {
// //     console.error("Delete cart item API failed", error);
// //   }
// // },









// removeFromCart: (state, action) => {

//   const cartKey = action.payload;

//   const item = state.items.find(
//     (product) => product.cartKey === cartKey
//   );

//   if (!item) return;

//   const cartItemId = item.cart_item_id;

//   state.items = state.items.filter(
//     (product) => product.cartKey !== cartKey
//   );

//   localStorage.setItem("cart", JSON.stringify(state.items));

//   try {

//     const userData = JSON.parse(localStorage.getItem("user"));
//     const userId = userData?.user_id;

//     if (!userId) return;
//     if (!cartItemId) return;

//     const payload = {
//       user_id: userId,
//       cart_item_id: cartItemId
//     };

//     // deleteCartItem(payload);

//   } catch (error) {
//     console.error("Delete cart item API failed", error);
//   }
// },










//     /*
//     When user changes weight
//     */
//     updateItemWeight: (state, action) => {
//       const { cartKey, newWeight, unit } = action.payload;

//       const item = state.items.find(
//         (product) => product.cartKey === cartKey
//       );

//       if (!item) return;

//       item.weight = newWeight;
//       item.unit = unit || item.unit;

//       item.cartKey = generateCartKey(item);

//       localStorage.setItem("cart", JSON.stringify(state.items));
//     },

    

//     clearCart: (state) => {

//   state.items = [];
//   localStorage.removeItem("cart");

//   /*
//   Backend Sync
//   */
//   try {

//     const userData = JSON.parse(localStorage.getItem("user"));
//     const userId = userData?.user_id;

//     if (!userId) return;

//     // clearCartApi({
//     //   user_id: userId
//     // });

//   } catch (error) {
//     console.error("Clear cart API failed", error);
//   }

// },








// setCartItemId: (state, action) => {

//   const { cartKey, cart_item_id } = action.payload;

//   const item = state.items.find(
//     (product) => product.cartKey === cartKey
//   );

//   if (!item) return;

//   item.cart_item_id = cart_item_id;

//   localStorage.setItem("cart", JSON.stringify(state.items));

// },





// setItemLoading: (state, action) => {
//   const { cartKey, type, value } = action.payload;

//   if (!state.loading.items[cartKey]) {
//     state.loading.items[cartKey] = {};
//   }

//   state.loading.items[cartKey][type] = value;
// },


//   },
// });

// export const {
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
//   updateItemWeight,
//   clearCart,
//   setCartItemId,
//   setItemLoading
// } = cartSlice.actions;

// export default cartSlice.reducer;









import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  clearCartApi,
  fetchCartItems,
} from "../api/AllApi";

const generateCartKey = (item) => {
  return `${item.productId}_${item.weight}_${item.unit || "kg"}`;
};

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: loadCartFromStorage(),
  loading: {
    items: {},
    global: false,
  },
};

const saveCartToStorage = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};


/*
 * Thunk: called on login + page refresh
 * Fetches backend cart → maps to frontend format → loads into Redux + localStorage
 */
const fetchCartFromServer = createAsyncThunk(
  "cart/fetchFromServer",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchCartItems(userId);

      // matches your exact API response shape:
      // response.data.items → array of cart items
      const items = response?.items || [];

      return items.map((item) => ({
        productId:    item.product_id,
        name:         item.product_name,
        image:        item.image || "",
        price:        item.unit_price,
        weight:       item.weight,
        unit:         item.unit || "kg",
        quantity:     item.quantity,
        cart_item_id: item.cart_item_id,
        cartKey:      `${item.product_id}_${item.weight}_${item.unit || "kg"}`,
      }));

    } catch (error) {
      console.error("fetchCartFromServer failed", error);
      return rejectWithValue(error.message);
    }
  }
);



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const item = action.payload;
      const cartKey = generateCartKey(item);
      const existingItem = state.items.find((p) => p.cartKey === cartKey);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...item,
          unit: item.unit || "kg",
          quantity: 1,
          cartKey,
        });
      }
      console.log("Add to cart output", item);
       saveCartToStorage(state.items); 
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((p) => p.cartKey === action.payload);
      if (!item) return;

      item.quantity += 1;

      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData?.user_id;
        if (!userId) return;

        const payload = {
          user_id: userId,
          product_id: item.productId,
          cart_item_id: item.cart_item_id,
          quantity: item.quantity,
          total_price: item.price * item.weight * item.quantity,
        };
        console.log("UPDATE CART ITEM INCREMENT BUTTON", payload);
      } catch (error) {
        console.error("Update quantity API failed", error);
      }
       saveCartToStorage(state.items); 
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((p) => p.cartKey === action.payload);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;

        try {
          const userData = JSON.parse(localStorage.getItem("user"));
          const userId = userData?.user_id;
          if (!userId) return;

          if (!item.cart_item_id) {
            console.warn("Missing cart_item_id → skipping update");
            return;
          }

          const payload = {
            user_id: userId,
            product_id: item.productId,
            cart_item_id: item.cart_item_id,
            quantity: item.quantity,
            total_price: item.price * item.weight * item.quantity,
          };
          console.log("UPDATE CART ITEM DECREMENT BUTTON", payload);
        } catch (error) {
          console.error("Update quantity API failed", error);
        }

      } else {
        const cartItemId = item.cart_item_id;
        state.items = state.items.filter((p) => p.cartKey !== action.payload);

        try {
          const userData = JSON.parse(localStorage.getItem("user"));
          const userId = userData?.user_id;
          if (!userId) return;

          if (!cartItemId) {
            console.warn("Missing cart_item_id → delete skipped");
            return;
          }

          const payload = { user_id: userId, cart_item_id: cartItemId };
          // deleteCartItem(payload);
        } catch (error) {
          console.error("Delete cart item API failed", error);
        }
      }
       saveCartToStorage(state.items); 
    },

    removeFromCart: (state, action) => {
      const cartKey = action.payload;
      const item = state.items.find((p) => p.cartKey === cartKey);
      if (!item) return;

      const cartItemId = item.cart_item_id;
      state.items = state.items.filter((p) => p.cartKey !== cartKey);

      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData?.user_id;
        if (!userId) return;
        if (!cartItemId) return;

        const payload = { user_id: userId, cart_item_id: cartItemId };
        // deleteCartItem(payload);
      } catch (error) {
        console.error("Delete cart item API failed", error);
      }
       saveCartToStorage(state.items); 
    },

    updateItemWeight: (state, action) => {
      const { cartKey, newWeight, unit } = action.payload;
      const item = state.items.find((p) => p.cartKey === cartKey);
      if (!item) return;

      item.weight = newWeight;
      item.unit = unit || item.unit;
      item.cartKey = generateCartKey(item);
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },

    setCartItemId: (state, action) => {
      const { cartKey, cart_item_id } = action.payload;
      const item = state.items.find((p) => p.cartKey === cartKey);
      if (!item) return;

      item.cart_item_id = cart_item_id;
    },

    setItemLoading: (state, action) => {
      const { cartKey, type, value } = action.payload;
      if (!state.loading.items[cartKey]) {
        state.loading.items[cartKey] = {};
      }
      state.loading.items[cartKey][type] = value;
    },

    // Phase 2: wire this up in login() once GET /cart is ready
    loadCartItems: (state, action) => {
      state.items = action.payload;
    },

  },


  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromServer.pending, (state) => {
        state.loading.global = true;
      })
      .addCase(fetchCartFromServer.fulfilled, (state, action) => {
        state.loading.global = false;
        state.items = action.payload;                              // replace frontend with backend truth
        localStorage.setItem("cart", JSON.stringify(state.items)); // sync localStorage
      })
      .addCase(fetchCartFromServer.rejected, (state) => {
        state.loading.global = false;
        // silently fail — existing localStorage cart stays as-is
      });
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  updateItemWeight,
  clearCart,
  setCartItemId,
  setItemLoading,
  loadCartItems,
} = cartSlice.actions;

export { fetchCartFromServer };
export default cartSlice.reducer;