// import axiosInstance from "./Axios";




// /*
//  * Fetch all categories
//  */
// export const getAllCategories = async (signal) => {
//   const response = await axiosInstance.post(
//     "/biz/fetch_all_categories",
//     {},
//     { signal }
//   );

//   if (!Array.isArray(response)) {
//     throw new Error("Invalid category format");
//   }

//   return response;
// };




// /*
//  * Fetch subcategories by category id
//  */
// export const getSubCategoriesByCategory = async (
//   categoryId,
//   signal
// ) => {
//   if (!categoryId) {
//     throw new Error("Category ID is required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/fetch_sub_category",
//     { category_id: categoryId },
//     { signal }
//   );

//   if (!Array.isArray(response)) {
//     throw new Error("Invalid subcategory format");
//   }

//   return response;
// };




// /*
//  * Fetch all a single product detail by product id
//  */
// export const getProductDetails = async (productId, signal) => {
//   if (!productId) {
//     throw new Error("Product ID is required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/fetch_one_product",
//     { product_id: Number(productId) },
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid product format");
//   }

//   return response;
// };




// /*
//  * Fetch single customer profile
//  */
// export const getCustomerProfile = async (userId, signal) => {
//   if (!userId) {
//     throw new Error("User ID is required");
//   }

//   const response = await axiosInstance.post(
//     "/adm/fetch_one_customer_data",
//     { user_id: userId },
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid profile response");
//   }

//   return response;
// };




// /*
//  * Add address - profile page
//  */
// export const addCustomerAddress = async (payload, signal) => {
//   if (!payload?.user_id) {
//     throw new Error("User ID is required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/add_address",
//     payload,
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid address response");
//   }

//   return response;
// };




// /*
//  * Add product to wishlist
//  */
// export const addToWishlist = async (userId, productId, signal) => {
//   if (!userId || !productId) {
//     throw new Error("User ID and Product ID are required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/add_and_remove_wishlist",
//     {
//       user_id: userId,
//       product_id: productId,
//     },
//     { signal }
//   );

//   return response;
// };




// /*
//  * Remove wishlist item
//  */
// export const deleteWishlistItem = async (userId, wishlistId, signal) => {
//   if (!userId || !wishlistId) {
//     throw new Error("User ID and Wishlist ID are required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/delete_one_wishlist_item",
//     {
//       user_id: userId,
//       wishlist_id: wishlistId,
//     },
//     { signal }
//   );

//   return response;
// };




// /*
//  * Fetch wishlist products
//  */
// export const fetchWishlist = async (userId, signal) => {
//   if (!userId) {
//     throw new Error("User ID is required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/fetch_wishlist",
//     { user_id: userId },
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid wishlist response");
//   }

//   return response;
// };




// /*
//  * Update customer profile
//  */
// export const updateCustomerProfile = async (payload, signal) => {
//   if (!payload?.user_id) {
//     throw new Error("User ID is required");
//   }

//   if (!payload?.name) {
//     throw new Error("Name is required");
//   }

//   if (!payload?.email) {
//     throw new Error("Email is required");
//   }

//   const response = await axiosInstance.post(
//     "/adm/update_customer_profile",
//     payload,
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid update profile response");
//   }

//   return response;
// };




// /*
//  * Get address from coordinates
//  */
// export const getAddressFromCoordinates = async (lat, lng, signal) => {

//   if (!lat || !lng) {
//     throw new Error("Latitude and Longitude are required");
//   }

//   const response = await axiosInstance.post(
//     "/adm/get_address",
//     {
//       lat,
//       lng
//     },
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid address response");
//   }

//   return response;
// };




// /*
//  * Fetch all addresses for a user
//  */
// export const fetchAllAddresses = async (userId, signal) => {

//   if (!userId) {
//     throw new Error("User ID is required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/fetch_all_address",
//     { user_id: userId },
//     { signal }
//   );

//   if ( !response || !Array.isArray(response)) {
//     throw new Error("Invalid address list response");
//   }

//   return response;
// };




// /*
//  * Update address
//  */
// export const updateCustomerAddress = async (payload, signal) => {

//   if (!payload?.address_id) {
//     throw new Error("Address ID is required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/update_address",
//     payload,
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid update address response");
//   }

//   return response;
// };




// export const deleteCustomerAddress = async (userId, addressId, signal) => {

//   if (!userId || !addressId) {
//     throw new Error("User ID and Address ID are required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/delete_address",
//     {
//       user_id: userId,
//       address_id: addressId
//     },
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid delete address response");
//   }

//   return response;
// };




// /*
//  * Add product to cart
//  */
// export const addCartItem = async (payload, signal) => {

//   if (!payload?.user_id || !payload?.product_id) {
//     throw new Error("User ID and Product ID are required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/add_to_cart",
//     payload
//   );

//   if (!response) {
//     throw new Error("Invalid add cart response");
//   }

//   return response;
// };




// /*
//  * Update cart quantity
//  */
// export const updateCartItemQuantity = async (payload, signal) => {

//   if (!payload?.user_id || !payload?.product_id) {
//     throw new Error("User ID and Product ID are required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/update_item_quantity",
//     payload,
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid update quantity response");
//   }

//   return response;
// };




// /*
//  * Delete one cart item
//  */
// export const deleteCartItem = async (payload, signal) => {

//   if (!payload?.user_id || !payload?.cart_item_id) {
//     throw new Error("User ID and Cart Item ID are required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/delete_one_item",
//     payload,
//     { signal }
//   );
  

//   if (!response) {
//     throw new Error("Invalid delete cart item response");
//   }

//   return response;
// };




// /*
//  * Clear entire cart
//  */
// export const clearCartApi = async (payload, signal) => {

//   if (!payload?.user_id) {
//     throw new Error("User ID is required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/clear_cart",
//     payload,
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid clear cart response");
//   }

//   return response;
// };




// export const fetchPurchaseHistory = async (userId) => {

//   const response = await axiosInstance.post(
//     "/biz/purchase_history",
//     { user_id: userId }
//   );

//   console.log("order hhistory page output",response)
//   return response?.orders || [];
// };




// /*
// Find distance between customer and shop
// */
// export const findCustomerDistance = async (address, signal) => {

//   if (!address) {
//     throw new Error("Address is required");
//   }

//   const response = await axiosInstance.post(
//     "/adm/find_customer_distance",
//     {
//       address: address
//     },
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid distance response");
//   }

//   return response;
// };




// /*
//  * Fetch default address
//  */
// export const fetchDefaultAddress = async (userId, signal) => {
//   if (!userId) {
//     throw new Error("User ID is required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/fetch_default_address",
//     { user_id: userId },
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid default address response");
//   }

//   console.log ("checkout-fetch-default-address-output", response)

//   return response;
// };




// /*
//  * Set default address
//  */
// export const setDefaultAddress = async (userId, addressId, signal) => {
//   if (!userId || !addressId) {
//     throw new Error("User ID and Address ID are required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/default_address",
//     {
//       user_id: userId,
//       address_id: addressId
//     },
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid set default address response");
//   }

//   console.log ("checkout-set-default-address-output", response)
//   return response;
// };




// /*
//  * Fetch order summary
//  */
// export const fetchOrderSummary = async (userId, signal) => {
//   if (!userId) {
//     throw new Error("User ID is required");
//   }

//   const response = await axiosInstance.post(
//     "/biz/fetch_order_summary",
//     { user_id: userId },
//     { signal }
//   );

//   if (!response) {
//     throw new Error("Invalid order summary response");
//   }

//   console.log ("checkout-fetch-order-summary-output", response)
//   return response;
// };










import axiosInstance from "./Axios";




/*
 * Fetch all categories
 */
export const getAllCategories = async (signal) => {
  const response = await axiosInstance.post(
    "/biz/fetch_all_categories",
    {},
    { signal }
  );

  if (!Array.isArray(response)) {
    throw new Error("Invalid category format");
  }

  return response;
};




/*
 * Fetch subcategories by category id
 */
export const getSubCategoriesByCategory = async (
  categoryId,
  signal
) => {
  if (!categoryId) {
    throw new Error("Category ID is required");
  }

  const response = await axiosInstance.post(
    "/biz/fetch_sub_category",
    { category_id: categoryId },
    { signal }
  );

  if (!Array.isArray(response)) {
    throw new Error("Invalid subcategory format");
  }

  return response;
};




/*
 * Fetch all a single product detail by product id
 */
export const getProductDetails = async (productId, signal) => {
  if (!productId) {
    throw new Error("Product ID is required");
  }

  const response = await axiosInstance.post(
    "/biz/fetch_one_product",
    { product_id: Number(productId) },
    { signal }
  );

  if (!response) {
    throw new Error("Invalid product format");
  }

  return response;
};




/*
 * Fetch single customer profile
 */
export const getCustomerProfile = async (userId, signal) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await axiosInstance.post(
    "/adm/fetch_one_customer_data",
    { user_id: userId },
    { signal }
  );

  if (!response) {
    throw new Error("Invalid profile response");
  }

  return response;
};




/*
 * Add address - profile page
 */
export const addCustomerAddress = async (payload, signal) => {
  if (!payload?.user_id) {
    throw new Error("User ID is required");
  }

  const response = await axiosInstance.post(
    "/biz/add_address",
    payload,
    { signal }
  );

  if (!response) {
    throw new Error("Invalid address response");
  }

  return response;
};




/*
 * Add product to wishlist
 */
export const addToWishlist = async (userId, productId, signal) => {
  if (!userId || !productId) {
    throw new Error("User ID and Product ID are required");
  }

  const response = await axiosInstance.post(
    "/biz/add_and_remove_wishlist",
    {
      user_id: userId,
      product_id: productId,
    },
    { signal }
  );

  return response;
};




/*
 * Remove wishlist item
 */
export const deleteWishlistItem = async (userId, wishlistId, signal) => {
  if (!userId || !wishlistId) {
    throw new Error("User ID and Wishlist ID are required");
  }

  const response = await axiosInstance.post(
    "/biz/delete_one_wishlist_item",
    {
      user_id: userId,
      wishlist_id: wishlistId,
    },
    { signal }
  );

  return response;
};




/*
 * Fetch wishlist products
 */
export const fetchWishlist = async (userId, signal) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await axiosInstance.post(
    "/biz/fetch_wishlist",
    { user_id: userId },
    { signal }
  );

  if (!response) {
    throw new Error("Invalid wishlist response");
  }

  return response;
};




/*
 * Update customer profile
 */
export const updateCustomerProfile = async (payload, signal) => {
  if (!payload?.user_id) {
    throw new Error("User ID is required");
  }

  if (!payload?.name) {
    throw new Error("Name is required");
  }

  if (!payload?.email) {
    throw new Error("Email is required");
  }

  const response = await axiosInstance.post(
    "/adm/update_customer_profile",
    payload,
    { signal }
  );

  if (!response) {
    throw new Error("Invalid update profile response");
  }

  return response;
};




/*
 * Get address from coordinates
 */
export const getAddressFromCoordinates = async (lat, lng, signal) => {

  if (!lat || !lng) {
    throw new Error("Latitude and Longitude are required");
  }

  const response = await axiosInstance.post(
    "/adm/get_address",
    {
      lat,
      lng
    },
    { signal }
  );

  if (!response) {
    throw new Error("Invalid address response");
  }

  return response;
};




/*
 * Fetch all addresses for a user
 */
export const fetchAllAddresses = async (userId, signal) => {

  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await axiosInstance.post(
    "/biz/fetch_all_address",
    { user_id: userId },
    { signal }
  );

  if ( !response || !Array.isArray(response)) {
    throw new Error("Invalid address list response");
  }

  return response;
};




/*
 * Update address
 */
export const updateCustomerAddress = async (payload, signal) => {

  if (!payload?.address_id) {
    throw new Error("Address ID is required");
  }

  const response = await axiosInstance.post(
    "/biz/update_address",
    payload,
    { signal }
  );

  if (!response) {
    throw new Error("Invalid update address response");
  }

  return response;
};




export const deleteCustomerAddress = async (userId, addressId, signal) => {

  if (!userId || !addressId) {
    throw new Error("User ID and Address ID are required");
  }

  const response = await axiosInstance.post(
    "/biz/delete_address",
    {
      user_id: userId,
      address_id: addressId
    },
    { signal }
  );

  if (!response) {
    throw new Error("Invalid delete address response");
  }

  return response;
};




/*
 * Add product to cart
 */
export const addCartItem = async (payload, signal) => {

  if (!payload?.user_id || !payload?.product_id) {
    throw new Error("User ID and Product ID are required");
  }

  const response = await axiosInstance.post(
    "/biz/add_to_cart",
    payload
  );

  if (!response) {
    throw new Error("Invalid add cart response");
  }

  return response;
};




/*
 * Update cart quantity
 */
export const updateCartItemQuantity = async (payload, signal) => {

  if (!payload?.user_id || !payload?.product_id) {
    throw new Error("User ID and Product ID are required");
  }

  const response = await axiosInstance.post(
    "/biz/update_item_quantity",
    payload,
    { signal }
  );

  if (!response) {
    throw new Error("Invalid update quantity response");
  }

  return response;
};




/*
 * Delete one cart item
 */
export const deleteCartItem = async (payload, signal) => {

  if (!payload?.user_id || !payload?.cart_item_id) {
    throw new Error("User ID and Cart Item ID are required");
  }

  const response = await axiosInstance.post(
    "/biz/delete_one_item",
    payload,
    { signal }
  );

  if (!response) {
    throw new Error("Invalid delete cart item response");
  }

  return response;
};




/*
 * Clear entire cart
 */
export const clearCartApi = async (payload, signal) => {

  if (!payload?.user_id) {
    throw new Error("User ID is required");
  }

  const response = await axiosInstance.post(
    "/biz/clear_cart",
    payload,
    { signal }
  );

  if (!response) {
    throw new Error("Invalid clear cart response");
  }

  return response;
};




export const fetchPurchaseHistory = async (userId) => {

  const response = await axiosInstance.post(
    "/biz/purchase_history",
    { user_id: userId }
  );

  console.log("order-history-output", response);
  return response?.orders || [];
};




/*
 * Find distance between customer and shop
 */
export const findCustomerDistance = async (address, signal) => {

  if (!address) {
    throw new Error("Address is required");
  }

  const response = await axiosInstance.post(
    "/adm/find_customer_distance",
    {
      address: address
    },
    { signal }
  );

  if (!response) {
    throw new Error("Invalid distance response");
  }

  return response;
};




/*
 * Fetch default address
 */
export const fetchDefaultAddress = async (userId, signal) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await axiosInstance.post(
    "/biz/fetch_default_address",
    { user_id: userId },
    { signal }
  );

  if (!response) {
    throw new Error("Invalid default address response");
  }

  console.log("checkout-fetch-default-address-output", response);
  return response;
};




/*
 * Set default address
 */
export const setDefaultAddress = async (userId, addressId, signal) => {
  if (!userId || !addressId) {
    throw new Error("User ID and Address ID are required");
  }

  const response = await axiosInstance.post(
    "/biz/default_address",
    {
      user_id: userId,
      address_id: addressId
    },
    { signal }
  );

  if (!response) {
    throw new Error("Invalid set default address response");
  }

  console.log("checkout-set-default-address-output", response);
  return response;
};




/*
 * Fetch order summary
 */
export const fetchOrderSummary = async (userId, signal) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await axiosInstance.post(
    "/biz/fetch_order_summary",
    { user_id: userId },
    { signal }
  );

  if (!response) {
    throw new Error("Invalid order summary response");
  }

  console.log("checkout-fetch-order-summary-output", response);
  return response;
};




/*
 * Create order in your backend (EC2 port 88)
 * Called simultaneously with createRazorpayOrder on "Proceed to Payment"
 * Response: { order_id: 40, order_number: "sm1000031" }
 */
export const createOrder = async (payload, signal) => {

  if (!payload?.user_id || !payload?.address_id || !payload?.total_amount) {
    throw new Error("user_id, address_id and total_amount are required");
  }

  const response = await axiosInstance.post(
    "/biz/create_order",
    {
      user_id: payload.user_id,
      address_id: payload.address_id,
      total_amount: String(payload.total_amount),
    },
    { signal }
  );

  if (!response) {
    throw new Error("Invalid create order response");
  }

  console.log("create-order-output", response);
  return response;
};




/*
 * Create Razorpay order (EC2 port 88 — colleague's endpoint)
 * Called simultaneously with createOrder on "Proceed to Payment"
 * Response: { order_id: "order_SVPz...", amount: 10000, key: "rzp_test_..." }
 */
export const createRazorpayOrder = async (payload, signal) => {

  if (!payload?.amount) {
    throw new Error("amount is required");
  }

  const response = await axiosInstance.post(
    "/adm/create_order_payment",
    {
      amount: Number(payload.amount),
      order_id : Number(payload.order_id),
      currency: "INR",

    },
    { signal }
  );

  if (!response) {
    throw new Error("Invalid Razorpay order response");
  }

  console.log("create-razorpay-order-output", response);
  return response;
};




/*
 * Verify Razorpay payment (EC2 port 88 — colleague's endpoint)
 * Called after successful Razorpay payment inside handler
 * Payload: { payment_id, razorpay_order_id, order_id, signature, amount }
 */
export const verifyRazorpayPayment = async (payload) => {

  if (!payload?.payment_id || !payload?.razorpay_order_id || !payload?.order_id || !payload?.signature) {
    throw new Error("payment_id, razorpay_order_id, order_id and signature are required");
  }

  const response = await axiosInstance.post(
    "/adm/order_payment_verify",
    {
      payment_id: payload.payment_id,
      razorpay_order_id: payload.razorpay_order_id,
      order_id: payload.order_id,
      signature: payload.signature,
      amount: payload.amount,
    }
  );

  if (!response) {
    throw new Error("Invalid verify payment response");
  }

  console.log("verify-razorpay-payment-output", response);
  return response;
};


/*
 * Fetch all cart items for a user on login
 */
export const fetchCartItems = async (userId, signal) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const response = await axiosInstance.post(
    "/biz/fetch_cart_items",
    { user_id: userId },
    { signal }
  );

  if (!response) {
    throw new Error("Invalid fetch cart response");
  }

  console.log("fetch-cart-on-login-output", response);
  return response;
};