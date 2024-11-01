const express = require("express");
const router = express.Router();
const {
  indexController,
  showController,
  newController,
  addDataContrtoller,
  showEditableDataContrtoller,
  deleteDataController,
  updateDataContrtoller,
} = require("../controllers/listingsController");
const validateListing = require("../middleware/validateListing");

//Index Route
router.route("/").get(indexController).post(validateListing,addDataContrtoller);
//New Route
router.route("/new").get(newController);
//Show Route // Delete Route //Update Route 
router.route("/:id").put(validateListing,updateDataContrtoller).get(showController).delete(deleteDataController)
//Edit Route 
router.route("/:id/edit").get(showEditableDataContrtoller);

module.exports = router;
