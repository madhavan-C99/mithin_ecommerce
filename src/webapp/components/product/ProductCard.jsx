import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Slider,
  Button,
  Box,
  Stack,
  IconButton,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity, setCartItemId  } from "../../store/CartSlice";
import { openCartDrawer } from "../../store/UiSlice";
import { addToWishlist, deleteWishlistItem, fetchWishlist } from "../../api/AllApi";
import { setWishlist } from "../../store/WishListSlice";

import { addCartItem } from "../../api/AllApi";

import { showNotification } from "../../store/DistanceNotifySlice";
import { decrementCartItem, incrementCartItem } from "../../store/CartActions";

const ProductCard = ({ product,
   showRemoveButton = false,
    wishlistId,
    categoryId,       
    categoryName,      
    subCategoryId,     
    subCategoryName,
    source,
   }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

   // whole unit / decimal unit
  const unit = product.unit || "kg";

  const isWholeUnit = unit === "pcs" || unit === "bn";
  const sliderMin = isWholeUnit ? 1 : 0.25;
  const sliderStep = isWholeUnit ? 1 : 0.25;

  const [weight, setWeight] = useState(isWholeUnit ? 1 : 0.25);
  const cartKey = `${product.id}_${weight}_${unit}`;

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.cartKey === cartKey)
  );

  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.product_id === product.id);
  const totalPrice = weight * product.pricePerKg;

  const deliveryEligibility = useSelector(
  (state) => state.delivery.eligibility
);

const delivery = useSelector((state) => state.delivery);

const loadingMap = useSelector((state) => state.cart.loading.items);

const incrementLoading = loadingMap[cartKey]?.increment || false;
const decrementLoading = loadingMap[cartKey]?.decrement || false;

  // const handleNavigate = () => navigate(`/products/${product.id}`);

  const handleNavigate = () =>
    navigate(`/products/${product.id}`, {
      state: {
        source,
        categoryId,
        categoryName,
        subCategoryId,
        subCategoryName,
      },
    });

  // const handleAddToCart = (e) => {
  //   e.stopPropagation();
  //   const exists = cartItem;
  //   dispatch(addToCart({
  //     productId: product.id,
  //     title: product.name,
  //     price: Number(product.pricePerKg),
  //     image: product.productimage,
  //     weight,
  //     unit,
  //   }));
  //   if (!exists) dispatch(openCartDrawer());
  // };





  const handleAddToCart = async (e) => {

  e.stopPropagation();

//   if (!deliveryEligibility) {
//   alert("Sorry, we deliver only within 3 km radius.");
//   return;
// }

if (!delivery.checked) {
  dispatch(
  showNotification({
    message: "Please select your delivery location first...",
    severity: "error"
  })
);

  // alert("Please select your delivery location first.");
  return;
}

if (!delivery.eligibility) {
   dispatch(
  showNotification({
    message: "Please select your delivery location first...",
    severity: "error"
  })
);

  // alert("Sorry, we deliver only within 3 km radius.");
  return;
}

  const item = {
    productId: product.id,
    title: product.name,
    price: Number(product.pricePerKg),
    image: product.productimage,
    weight: weight,
    unit: unit,
  };

  const cartKey = `${item.productId}_${item.weight}_${item.unit || "kg"}`;
  

  // 1️⃣ add to redux
  dispatch(addToCart(item));

  try {

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.user_id;

    if (!userId) return;

    const payload = {
      user_id: userId,
      product_id: item.productId,
      weight: item.weight,
      unit_price: item.price,
      quantity: 1,
      total_price: item.price * item.weight
    };

    const response = await addCartItem(payload);

    const cartItemId = response?.cart_item_id;

    console.log("Received cart_item_id:", cartItemId);

    if (!cartItemId) return;

    // 2️⃣ update redux with cart_item_id
    dispatch(
      setCartItemId({
        cartKey: cartKey,
        cart_item_id: cartItemId
      })
    );

  } catch (error) {

    console.error("Add cart API failed", error);

  }
};





  const handleWishlist = async (e) => {
    e.stopPropagation();
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.user_id;
    // if (!userId) return;

    if (!userId) {
  dispatch(
    showNotification({
      message: "Please login to add items to your wishlist.",
      severity: "warning"
    })
  );
  return;
}


    if (!isWishlisted) {
      await addToWishlist(userId, product.id);
    } else {
      const item = wishlist.find((w) => w.product_id === product.id);
      if (!item) return;
      await deleteWishlistItem(userId, item.wishlist_id);
    }
    const response = await fetchWishlist(userId);
    dispatch(setWishlist(Array.isArray(response) ? response : []));
  };

  const handleRemoveFromWishlist = async (e) => {
    e.stopPropagation();
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.user_id;
    if (!userId || !wishlistId) return;
    await deleteWishlistItem(userId, wishlistId);
    const response = await fetchWishlist(userId);
    dispatch(setWishlist(Array.isArray(response) ? response : []));
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",          // ✅ fills grid cell on every screen size
        minWidth: 0,            // ✅ prevents overflow
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        overflow: "visible",
        border: "1px solid #e6e6e6",
        position: "relative",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Wishlist / Remove button */}
      {!showRemoveButton ? (
        <IconButton
          onClick={handleWishlist}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            zIndex: 2,
            "&:hover": { backgroundColor: "#fff" },
          }}
        >
          {isWishlisted ? (
            <FavoriteIcon sx={{ color: "red", fontSize: { xs: 16, sm: 20 } }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
          )}
        </IconButton>
      ) : (
        <IconButton
          onClick={handleRemoveFromWishlist}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            zIndex: 2,
          }}
        >
          <DeleteOutlineIcon color="error" sx={{ fontSize: { xs: 16, sm: 20 } }} />
        </IconButton>
      )}

      {/* Product Image */}
      <Box
        component="img"
        src={product.productimage}
        alt={product.name}
        onClick={handleNavigate}
        sx={{
          height: { xs: 120, sm: 150, md: 180, lg: 200 },  // ✅ shrinks on mobile
          width: "100%",
          objectFit: "contain",
          pt: 1,
        }}
      />

      {/* Card Content */}
      <CardContent sx={{ px: { xs: 1.5, sm: 2 }, pb: "28px !important", flexGrow: 1 }}>
        <Stack spacing={{ xs: 0.8, sm: 1.2 }}>

          {/* Name + Price per unit row */}
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}
            onClick={handleNavigate}
          >
            <Typography
              fontWeight={600}
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                lineHeight: 1.3,
                flex: 1,
                wordBreak: "break-word",   // ✅ long names wrap properly
              }}
            >
              {product.name}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" },
                whiteSpace: "nowrap",       // ✅ price per unit never wraps
                flexShrink: 0,
              }}
            >
              ₹ {product.pricePerKg} / {unit}
            </Typography>
          </Box>

          {/* Tamil name */}
          <Typography
            fontWeight={600}
            sx={{
              fontSize: { xs: "0.72rem", sm: "0.82rem", md: "0.9rem" },
              color: "#555",
              wordBreak: "break-word",     // ✅ Tamil text wraps, never overflows
            }}
          >
            {product.tamilname}
          </Typography>

          {/* Quantity Slider */}
          <Box>
            <Typography sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" }, mb: 0.5 }}>
              {/* Quantity: {weight.toFixed(2)} {unit} */}
              Quantity: {isWholeUnit ? weight : weight.toFixed(2)} {unit}
            </Typography>
            <Slider
              value={weight}
              min={sliderMin}   // 👈 was 0.25
              max={4}
              step={sliderStep} // 👈 was 0.25
              onChange={(e, val) => setWeight(val)}
              valueLabelDisplay="auto"
              sx={{ color: "#4CAF50", py: { xs: "6px", sm: "10px" } }}
            />
          </Box>

          {/* Total price */}
          <Typography
            fontWeight={700}
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, color: "#1a1a1a" }}
          >
            ₹ {totalPrice.toFixed(2)}
          </Typography>

        </Stack>
      </CardContent>

      {/* Add to Cart / Counter button */}
      {!cartItem ? (
        <IconButton
          onClick={handleAddToCart}
          sx={{
            position: "absolute",
            bottom: -18,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#e8f5e9",
            border: "1px solid #49554a",
            color: "#4CAF50",
            width: { xs: 32, sm: 38 },
            height: { xs: 32, sm: 38 },
            "&:hover": { backgroundColor: "#c8e6c9" },
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
        </IconButton>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: "absolute",
            bottom: -18,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            border: "1px solid #4CAF50",
            borderRadius: 3,
            px: { xs: "4px", sm: "8px" },
            py: "2px",
            whiteSpace: "nowrap",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Button disabled={decrementLoading} size="small" onClick={() => dispatch(decrementCartItem(cartItem.cartKey))}
            sx={{ minWidth: { xs: 24, sm: 32 }, fontSize: { xs: "0.8rem", sm: "1rem" }, color: "#4CAF50" }}>
            {decrementLoading ? "..." : "-"}
          </Button>

          <Typography fontWeight={600} sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" }, px: 0.5 }}>
            {cartItem.quantity}

          </Typography>
          <Button disabled={incrementLoading} size="small" onClick={() => dispatch(incrementCartItem(cartItem.cartKey))}
            sx={{ minWidth: { xs: 24, sm: 32 }, fontSize: { xs: "0.8rem", sm: "1rem" }, color: "#4CAF50" }}>
            {incrementLoading ? "..." : "+"}
          </Button>
        </Stack>
      )}
    </Card>
  );
};

export default React.memo(ProductCard);
