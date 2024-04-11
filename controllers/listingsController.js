const Listing = require("../models/listingModel");

const index = async (req, res) => {
  const allListing = await Listing.find();
  res.render("listings/index", { allListing });
};
const show = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
};

module.exports = { index, show };
