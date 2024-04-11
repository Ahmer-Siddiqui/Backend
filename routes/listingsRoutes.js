const express = require("express");
const router = express.Router();
const {index,show} = require("../controllers/listingsController");

//Index Route
router.route("/").get(index);
//Show Route
router.route("/:id").get(show);

module.exports = router;