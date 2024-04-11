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

//Index Route
router.route("/").get(indexController).post(addDataContrtoller);
//New Route
router.route("/new").get(newController);
//Show Route // Delete Route //Update Route 
router.route("/:id").get(showController).delete(deleteDataController).put(updateDataContrtoller);
//Edit Route 
router.route("/:id/edit").get(showEditableDataContrtoller);

module.exports = router;
