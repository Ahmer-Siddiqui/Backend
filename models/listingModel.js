const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1712372271755-d52f636fed93?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) => {
      return v === ""
        ? "https://images.unsplash.com/photo-1712372271755-d52f636fed93?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v;
    },
  },
  price: { type: Number },
  location: { type: String },
  country: { type: String },
});
module.exports = new mongoose.model("Listing", ListingSchema);
