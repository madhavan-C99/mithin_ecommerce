// dynamic unit instead of hard code kg

import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs, Link } from "@mui/material";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Grid
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { getProductDetails } from "../api/AllApi";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/CartSlice";

import { openCartDrawer } from "../store/UiSlice";

import {
  addToWishlist,
  deleteWishlistItem,
  fetchWishlist
} from "../api/AllApi";

import { setWishlist } from "../store/WishListSlice";

import { addCartItem } from "../api/AllApi";
import { setCartItemId } from "../store/CartSlice";
import { showNotification } from "../store/DistanceNotifySlice";

import { incrementCartItem, decrementCartItem } from "../store/CartActions";

const ProductDetailsPage = () => {

  const { productId } = useParams();
  const location = useLocation();  
  const navigate = useNavigate(); 

   // ✅ Read category info passed from ProductCard
  const categoryId = location.state?.categoryId;
  const categoryName = location.state?.categoryName;
  const subCategoryId = location.state?.subCategoryId;
  const subCategoryName = location.state?.subCategoryName;

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const delivery = useSelector((state) => state.delivery);

  /*
  Find cart item for this product
  */
  const cartItem = useSelector((state) =>
    state.cart.items.find(
      (item) => item.productId === Number(productId)
    )
  );

  /*
  Wishlist state
  */
  const wishlist = useSelector((state) => state.wishlist.items);

  const isWishlisted = wishlist.some(
    (item) => item.product_id === Number(productId)
  );

  /*
  Default selected weight if not in cart
  */
  const selectedWeight = cartItem ? cartItem.weight : 0.25;

  /*
  cartKey used for quantity updates
  */
  const cartKey = cartItem ? cartItem.cartKey : null;

  // api call loading for add to cart, increment decrement
  const loadingMap = useSelector((state) => state.cart.loading.items);

  const incrementLoading = cartKey
    ? loadingMap[cartKey]?.increment || false
    : false;

  const decrementLoading = cartKey
    ? loadingMap[cartKey]?.decrement || false
    : false;

  useEffect(() => {

    if (!productId) return;

    const controller = new AbortController();

    const fetchProduct = async () => {

      try {

        setError(null);

        const data = await getProductDetails(
          productId,
          controller.signal
        );

        if (!data) {
          throw new Error("Product not found");
        }

        setProduct(data);

      } catch (err) {

        if (
          err.name !== "CanceledError" &&
          err.name !== "AbortError"
        ) {
          setError("Failed to fetch product");
        }

      }

    };

    fetchProduct();

    return () => controller.abort();

  }, [productId]);

  if (!product && !error) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">
          {error || "Product not found"}
        </Typography>
      </Box>
    );
  }

  /*
  Dynamic unit support
  */
  const unit = product.unit || "kg";

  /*
  Add to cart handler
  */
  const handleAddToCart = async () => {

    if (!delivery.checked) {
      dispatch(
        showNotification({
          message: "Please select your delivery location first...",
          severity: "error"
        })
      );
      return;
    }

    if (!delivery.eligibility) {
      dispatch(
        showNotification({
          message: "Please select your delivery location first...",
          severity: "error"
        })
      );
      return;
    }

    const item = {
      productId: Number(product.id),
      title: product.name,
      price: Number(product.price),
      image: product.image,
      weight: selectedWeight,
      unit: product.unit,
    };

    const cartKey =
      `${item.productId}_${item.weight}_${item.unit || "kg"}`;

    // add to redux first
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

      if (!cartItemId) return;

      dispatch(
        setCartItemId({
          cartKey,
          cart_item_id: cartItemId
        })
      );

    } catch (error) {

      console.error("Add cart API failed", error);

    }

    if (!cartItem) {
      dispatch(openCartDrawer());
    }

  };

  /*
  Wishlist toggle
  */
  const handleWishlist = async () => {

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.user_id;

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

      await addToWishlist(userId, Number(productId));

    } else {

      const item = wishlist.find(
        (w) => w.product_id === Number(productId)
      );

      if (!item) return;

      await deleteWishlistItem(userId, item.wishlist_id);

    }

    const response = await fetchWishlist(userId);

    dispatch(setWishlist(Array.isArray(response) ? response : []));

  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4, md: 6 },
        mt: { xs: 2, sm: 4, md: 6 },
      }}
    >





       {/* ✅ NEW: Breadcrumb — only show if category info exists */}
      {/* {categoryName && (
        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <Breadcrumbs separator="›"> */}

            {/* Home */}
            {/* <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              onClick={() => navigate("/")}
            >
              Home
            </Link> */}

            {/* Category → goes to CategoryProductsPage */}
            {/* <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              onClick={() =>
                navigate(`/products/category/${categoryId}`, {
                  state: { categoryName },
                })
              }
            >
              {categoryName}
            </Link> */}

            {/* SubCategory → goes back to ProductsPage */}
            {/* <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              onClick={() =>
                navigate("/products", {
                  state: { categoryId, categoryName, subCategoryId, subCategoryName },
                })
              }
            >
              {subCategoryName}
            </Link> */}

            {/* Product name — current page, not clickable */}
            {/* <Typography
              color="text.primary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, fontWeight: 600 }}
            >
              {product.name}
            </Typography> */}

          {/* </Breadcrumbs>
        </Box>
      )} */}







      {(() => {
  const source = location.state?.source;

  let crumbs = [];

  if (source === "category") {
    crumbs = [
      {
        label: categoryName,
        onClick: () =>
          navigate(`/products/category/${categoryId}`, {
            state: { categoryName },
          }),
      },
      {
        label: subCategoryName,
        onClick: () =>
          navigate("/products", {
            state: { categoryId, categoryName, subCategoryId, subCategoryName },
          }),
      },
    ];

  } else if (source === "categoryProducts") {
    crumbs = [
      {
        label: categoryName,
        onClick: () =>
          navigate(`/products/category/${categoryId}`, {
            state: { categoryName },
          }),
      },
    ];

  } else if (source === "wishlist") {
    crumbs = [
      {
        label: "Wishlist",
        onClick: () => navigate("/wishlist"),
      },
    ];

  } else if (source === "popular") {
    crumbs = [
      {
        label: "Popular Products",
        onClick: () => navigate("/"),
      },
    ];

  } else if (source === "search") {
    crumbs = [
      {
        label: "Search Results",
        onClick: () => navigate(-1),
      },
    ];
  }

  if (crumbs.length === 0) return null;

  return (
    <Box sx={{ mb: { xs: 2, sm: 3 } }}>
      <Breadcrumbs separator="›">

        {/* Home — always first */}
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          onClick={() => navigate("/")}
        >
          Home
        </Link>

        {/* Middle crumbs */}
        {crumbs.map((crumb, index) => (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            sx={{ cursor: "pointer", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            onClick={crumb.onClick}
          >
            {crumb.label}
          </Link>
        ))}

        {/* Product name — always last */}
        <Typography
          color="text.primary"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, fontWeight: 600 }}
        >
          {product.name}
        </Typography>

      </Breadcrumbs>
    </Box>
  );
})()}

      






      <Grid container spacing={{ xs: 3, md: 5 }} alignItems="stretch">

        {/* ── IMAGE — full width on mobile, left half on desktop ── */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              backgroundColor: "#f9f9f9",
              minHeight: { xs: 240, sm: 300, md: 380 },
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: { xs: 240, sm: 300, md: 380 },
                objectFit: "contain",
              }}
            />
          </Paper>
        </Grid>

        {/* ── DETAILS — full width on mobile, right half on desktop ── */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: { xs: 2, md: 0 },
            }}
          >

            <Box>

              {/* Product name */}
              <Typography
                variant="h4"
                fontWeight={600}
                gutterBottom
                sx={{
                  fontSize: { xs: "1.4rem", sm: "1.75rem", md: "2rem" },
                  lineHeight: 1.3,
                }}
              >
                {product.name}
              </Typography>

              {/* Tamil name */}
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                {product.tamil_name}
              </Typography>

              {/* Price */}
              <Typography
                variant="h5"
                color="success.main"
                sx={{
                  mt: { xs: 2, md: 3 },
                  fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.75rem" },
                  fontWeight: 700,
                }}
              >
                ₹{product.price}
              </Typography>

              {/* Selected quantity */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
              >
                Selected Quantity: {selectedWeight} {unit}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  lineHeight: 1.7,
                }}
              >
                Description: {product.description}
              </Typography>

              {/* ── BUTTONS ── */}
              <Box
                sx={{
                  mt: { xs: 3, md: 4 },
                  // mobile: full width side by side
                  // desktop: 70% width side by side
                  width: { xs: "100%", md: "70%" },
                  display: "flex",
                  gap: { xs: 1.5, sm: 2 },
                }}
              >

                {/* ADD TO CART / QUANTITY STEPPER */}
                <Box sx={{ flex: 1 }}>

                  {!cartItem ? (

                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      sx={{
                        borderRadius: "40px",
                        height: { xs: 48, sm: 55 },
                        fontWeight: 600,
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        whiteSpace: "nowrap",
                      }}
                      onClick={handleAddToCart}
                    >
                      ADD TO CART
                    </Button>

                  ) : (

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid #4CAF50",
                        borderRadius: "40px",
                        height: { xs: 48, sm: 55 },
                        px: { xs: 1, sm: 2 },
                      }}
                    >

                      <Button
                        disabled={decrementLoading}
                        sx={{
                          minWidth: { xs: 32, sm: 40 },
                          color: "#4CAF50",
                          fontSize: { xs: "1rem", sm: "1.2rem" },
                        }}
                        onClick={() =>
                          dispatch(decrementCartItem(cartKey))
                        }
                      >
                        {decrementLoading ? "..." : "-"}
                      </Button>

                      <Typography
                        fontWeight={600}
                        sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                      >
                        {cartItem.quantity}
                      </Typography>

                      <Button
                        disabled={incrementLoading}
                        sx={{
                          minWidth: { xs: 32, sm: 40 },
                          color: "#4CAF50",
                          fontSize: { xs: "1rem", sm: "1.2rem" },
                        }}
                        onClick={() =>
                          dispatch(incrementCartItem(cartKey))
                        }
                      >
                        {incrementLoading ? "..." : "+"}
                      </Button>

                    </Box>

                  )}

                </Box>

                {/* WISHLIST BUTTON */}
                <Button
                  variant="outlined"
                  color={isWishlisted ? "error" : "inherit"}
                  startIcon={
                    isWishlisted
                      ? <FavoriteIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
                      : <FavoriteBorderIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
                  }
                  sx={{
                    flex: 1,
                    borderRadius: "40px",
                    height: { xs: 48, sm: 55 },
                    px: { xs: 1, sm: 3 },
                    fontWeight: 600,
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                    whiteSpace: "nowrap",
                    // hide label text on very small screens, show only icon
                    "& .MuiButton-startIcon": {
                      mr: { xs: 0.5, sm: 1 },
                    },
                  }}
                  onClick={handleWishlist}
                >
                  {/* Shorten label on xs */}
                  <Box
                    component="span"
                    sx={{ display: { xs: "none", sm: "inline" } }}
                  >
                    {isWishlisted ? "WISHLISTED" : "ADD TO WISHLIST"}
                  </Box>
                  <Box
                    component="span"
                    sx={{ display: { xs: "inline", sm: "none" } }}
                  >
                    {isWishlisted ? "SAVED" : "WISHLIST"}
                  </Box>
                </Button>

              </Box>

            </Box>

          </Box>

        </Grid>

      </Grid>

      {/* ── DISCLAIMER ── */}
      <Box
        sx={{
          mt: { xs: 4, md: 5 },
          p: { xs: 2, sm: 3 },
          backgroundColor: "#f9f9f9",
          borderRadius: 3,
        }}
      >

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          Disclaimer
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" }, lineHeight: 1.8 }}
        >
          Every effort is made to maintain accuracy of all
          information. However, actual product packaging and
          materials may contain more and/or different
          information.
        </Typography>

      </Box>

    </Box>
  );
};

export default ProductDetailsPage;