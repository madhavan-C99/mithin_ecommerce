// // import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   distance: null,
// //   isDeliverable: true
// // };

// // const deliverySlice = createSlice({
// //   name: "delivery",
// //   initialState,
// //   reducers: {

// //     setDeliveryStatus: (state, action) => {

// //       const distance = action.payload;

// //       state.distance = distance;
// //       state.isDeliverable = distance <= 3;

// //     }

// //   }
// // });

// // export const { setDeliveryStatus } = deliverySlice.actions;
// // export default deliverySlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   lat: null,
//   lng: null,
//   address: "",
//   eligibility: null, // true or false
//   checked: false,
//   source: null
// };

// const deliverySlice = createSlice({
//   name: "delivery",
//   initialState,
//   reducers: {

//     setDeliveryStatus: (state, action) => {

//       const { lat, lng, address, eligibility, source } = action.payload;

//       state.lat = lat;
//       state.lng = lng;
//       state.address = address;
//       state.eligibility = eligibility;
//       state.checked = true;
//       state.source = source ?? "navbar";

//       localStorage.setItem("deliveryState", JSON.stringify(state));

//        if (!eligibility) {
//     localStorage.removeItem("cart");
//   }
//     },

//     loadDeliveryFromStorage: (state) => {

//       const saved = localStorage.getItem("deliveryState");

//       if (!saved) return;

//       const parsed = JSON.parse(saved);

//       state.lat = parsed.lat;
//       state.lng = parsed.lng;
//       state.address = parsed.address;
//       state.eligibility = parsed.eligibility;
//       state.checked = parsed.checked;
//     }

//   }
// });

// export const {
//   setDeliveryStatus,
//   loadDeliveryFromStorage
// } = deliverySlice.actions;

// export default deliverySlice.reducer;










import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: null,
  lng: null,
  address: "",
  eligibility: null,
  checked: false,
  source: null,
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {

    setDeliveryStatus: (state, action) => {
      const { lat, lng, address, eligibility, source } = action.payload;

      state.lat = lat;
      state.lng = lng;
      state.address = address;
      state.eligibility = eligibility;
      state.checked = true;
      state.source = source ?? "navbar";

      localStorage.setItem("deliveryState", JSON.stringify(state));

      if (!eligibility) {
        localStorage.removeItem("cart");
      }
    },

    loadDeliveryFromStorage: (state) => {
      const saved = localStorage.getItem("deliveryState");
      if (!saved) return;

      const parsed = JSON.parse(saved);
      state.lat = parsed.lat;
      state.lng = parsed.lng;
      state.address = parsed.address;
      state.eligibility = parsed.eligibility;
      state.checked = parsed.checked;
    },

    // ✅ New — call this on logout and invalid session
    clearDelivery: (state) => {
      state.lat = null;
      state.lng = null;
      state.address = "";
      state.eligibility = null;
      state.checked = false;
      state.source = null;
      localStorage.removeItem("deliveryState");
    },

  },
});

export const {
  setDeliveryStatus,
  loadDeliveryFromStorage,
  clearDelivery,         // ✅ export
} = deliverySlice.actions;

export default deliverySlice.reducer;