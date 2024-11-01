const { required } = require("joi");
const Listing = require("../models/listingModel");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const listingSchema = require("../schema");
const validateListing = require("../middleware/validateListing");

const indexController = wrapAsync(async (req, res) => {
  const allListing = await Listing.find();
  res.render("listings/index", { allListing });
});

const newController = async (req, res) => {
  res.render("listings/new");
};

const showController = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
});

const addDataContrtoller = wrapAsync(
  async (req, res, next) => {
    const { listing } = req.body;
    const result = listingSchema.validate(listing);
    if (result.error) {
      throw new ExpressError(400, result.error);
    }
    const newlisting = new Listing(listing);
    await newlisting.save();
    res.redirect("/listings");
  }
);

const updateDataContrtoller = wrapAsync(async (req, res) => {
  const listing = req.body.listing;
  const { id } = req.params; 
  await Listing.findByIdAndUpdate(id, { ...listing });
  res.redirect(`/listings/${id}`); 
});

const showEditableDataContrtoller = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
});

const deleteDataController = wrapAsync(async (req, res) => {
  const { id } = req.params; 
  const deletedListing = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

module.exports = {
  updateDataContrtoller,
  showEditableDataContrtoller,
  deleteDataController,
  indexController,
  newController,
  showController,
  addDataContrtoller,
};
