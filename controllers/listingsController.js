const Listing = require("../models/listingModel");

const indexController = async (req, res) => {
  const allListing = await Listing.find();
  res.render("listings/index", { allListing });
};
const newController = async (req, res) => {
  res.render("listings/new");
};
const showController = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
};
const addDataContrtoller = async (req, res) => {
  const listing = req.body.listing;
  const newlisting = new Listing(listing);
  await newlisting.save();
  res.redirect("/listings");
};
const updateDataContrtoller = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
};
const showEditableDataContrtoller = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
};
const deleteDataController = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
};

module.exports = {
  updateDataContrtoller,
  showEditableDataContrtoller,
  deleteDataController,
  indexController,
  newController,
  showController,
  addDataContrtoller,
};
