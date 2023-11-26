// routes.js
const express = require("express");
const router = express.Router();
const { listings, managers, buildings, users, wishlists } = require("../models");
const { validateToken } = require("../middleware/Middleware");
const wishlistService = require("../service/Wishlist");

router.get("/get", validateToken, wishlistService.getWishlistedListings);

router.post("/add", validateToken, wishlistService.addWishlistItem);

router.post("/remove", validateToken, wishlistService.removeWishlistItem);

module.exports = router;
