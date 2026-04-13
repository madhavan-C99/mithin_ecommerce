// cartdrawer.jsx

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
  Divider,
  Avatar,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import { useSelector, useDispatch } from "react-redux";
import { openCartDrawer, closeCartDrawer } from "../../store/UiSlice";

import { Slide } from "@mui/material";

import {
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
  clearCartAsync ,
} from "../../store/CartActions";

import { useLocation, useNavigate } from "react-router-dom";

import { showNotification } from "../../store/DistanceNotifySlice";
import { useEffect } from "react";

const CartDrawer = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const open = useSelector((state) => state.ui.cartDrawerOpen);
  const items = useSelector((state) => state.cart.items);

  const delivery = useSelector((state) => state.delivery);

  const loadingMap = useSelector((state) => state.cart.loading.items);

  /*
  Subtotal calculation
  */
  const subtotal = items.reduce((acc, item) => {
    const weightPrice = Number(item.price) * Number(item.weight);
    return acc + weightPrice * item.quantity;
  }, 0);

  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

useEffect(() => {
  if (location.pathname === "/cart") {
    dispatch(openCartDrawer());
  } else {
    dispatch(closeCartDrawer());
  }
}, [location.pathname, dispatch]);



  // const handleCheckout = () => {
  //   dispatch(closeCartDrawer());
  //   navigate("/checkout");
  // };


  const handleCheckout = () => {

  if (!delivery.checked) {
    dispatch(
  showNotification({
    message: "Please select your delivery location before checkout.",
    severity: "error"
  })
);

    // alert("Please select your delivery location before checkout.");
    return;
  }

  if (!delivery.eligibility) {
    dispatch(
  showNotification({
    message: "Sorry, we currently deliver only within a 3 km radius.",
    severity: "error"
  })
);

    // alert("Sorry, we currently deliver only within a 3 km radius.");
    return;
  }

  dispatch(closeCartDrawer());
  navigate("/checkout");

};


  return (
    <Drawer
      anchor="right"
      open={open}
      // onClose={() => dispatch(closeCartDrawer())}
      onClose={() => { navigate(-1); }}
      transitionDuration={300}
      PaperProps={{
        sx: {
          width: 380,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* HEADER */}
      <Box p={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Cart ({totalItems})
          </Typography>

          <Stack direction="row" spacing={1}>
            {items.length > 0 && (
              <IconButton
                size="small"
                color="error"
                onClick={() => 
                  // dispatch(clearCart())
                  dispatch(clearCartAsync())
                }>
                <DeleteSweepIcon />
              </IconButton>
            )}

            {/* <IconButton onClick={() => dispatch(closeCartDrawer())}> */}
            <IconButton onClick={() => navigate(-1)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* CART ITEMS */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
        }}
      >
        {items.length === 0 ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#9e9e9e",
            }}
          >
            <ShoppingCartCheckoutIcon
              sx={{ fontSize: 80, mb: 2, opacity: 0.3 }}
            />

            <Typography variant="h6" fontWeight={600}>
              Your cart is empty
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, mb: 3 }}>
              Looks like you haven’t added anything yet.
            </Typography>

            <Button
              variant="outlined"
              sx={{
                borderColor: "#4CAF50",
                color: "#4CAF50",
                "&:hover": {
                  borderColor: "#43A047",
                  backgroundColor: "#f1f8f4",
                },
              }}
              // onClick={() => dispatch(closeCartDrawer())}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          items.map((item) => {

             const incrementLoading = loadingMap[item.cartKey]?.increment || false;
             const decrementLoading = loadingMap[item.cartKey]?.decrement || false;

            const unit = item.unit || "kg";

            const weightPrice =
              Number(item.price) * Number(item.weight);

            const itemTotal =
              weightPrice * item.quantity;

              // const loading = useSelector(
              //   state => state.cart.loading.items[item.cartKey] || {}
              // );

              // const incrementLoading = useSelector(
              //   state => state.cart.loading.items[item.cartKey]?.increment || false
              // );
              
              // const decrementLoading = useSelector(
              //   state => state.cart.loading.items[item.cartKey]?.decrement || false
              // );

            return (
              <Slide
                key={item.cartKey}
                direction="left"
                in={true}
                mountOnEnter
                timeout={300}
              >
                <Box
                  mb={2}
                  p={2}
                  sx={{
                    border: "1px solid #eeeeee",
                    borderRadius: 3,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  {/* PRODUCT IMAGE */}
                  <Avatar
                    src={item.image}
                    variant="rounded"
                    sx={{ width: 64, height: 64 }}
                  />

                  {/* DETAILS */}
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={600} fontSize={14}>
                      {item.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.weight} {unit}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      ₹ {weightPrice.toFixed(2)} × {item.quantity}
                    </Typography>

                    {/* Quantity Controls */}
                    <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                      <Button
                        disabled={decrementLoading}
                        size="small"
                        sx={{ minWidth: 28 }}
                        onClick={() =>
                          // dispatch(decreaseQuantity(item.cartKey))
                          dispatch(decrementCartItem(item.cartKey))
                        }
                      >
                        {decrementLoading ? "..." : "-"}
                      </Button>

                      <Typography fontSize={14}>
                        {item.quantity}
                      </Typography>

                      <Button
                        disabled={incrementLoading}
                        size="small"
                        sx={{ minWidth: 28 }}
                        onClick={() =>
                          // dispatch(increaseQuantity(item.cartKey))
                          dispatch(incrementCartItem(item.cartKey))
                        }
                      >
                         {incrementLoading ? "..." : "+"}
                      </Button>
                    </Stack>
                  </Box>

                  {/* REMOVE */}
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() =>
                      // dispatch(removeFromCart(item.cartKey))
                      dispatch(removeCartItem(item.cartKey))
                    }
                  >
                    <DeleteOutlineIcon />
                  </IconButton>

                  {/* TOTAL */}
                  <Typography fontWeight={600} fontSize={14}>
                    ₹ {itemTotal.toFixed(2)}
                  </Typography>
                </Box>
              </Slide>
            );
          })
        )}
      </Box>

      <Divider />

      {/* FOOTER */}
      <Box p={2}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight={600}>Subtotal</Typography>

            <Typography fontWeight={600}>
              ₹ {subtotal.toFixed(2)}
            </Typography>
          </Stack>

          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingCartCheckoutIcon />}
            disabled={items.length === 0}
            sx={{
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#43A047" },
            }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;