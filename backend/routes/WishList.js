// routes.js
const express = require("express");
const router = express.Router();
const { listings, managers, buildings, users, wishlists } = require("../models");
const { validateToken } = require("../Middleware/middleware");
const wishlistService = require("../Service/Wishlist");

router.get("/get", validateToken, wishlistService.getWishlistedListings);

router.post("/add", validateToken, wishlistService.addWishlistItem);

router.post("/remove", validateToken, wishlistService.removeWishlistItem);

module.exports = router;
