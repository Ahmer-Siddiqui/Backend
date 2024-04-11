const express = require("express");
const app = express();
const { PORT } = require("dotenv").config().parsed;
const path = require("path");
const Listing = require("./models/listingModel");
const methodOverride = require("method-override");
// const { data } = require("./init/data");

//Database connection
const connectDB = require("./db/connect")();

// template engine config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));  

//Index Route
app.get("/listings", async (req, res) => {
  const allListing = await Listing.find();
  res.render("listings/index", { allListing });
});
// app.use("/listings",require("./routes/listingsRoutes"))

//New Route
app.get("/listings/new",async(req, res)=>{
  const {id} = req.params;
  const listing = await Listing.findByIdAndUpdate(id,{...req.body.lisitng});
  res.render("listings/new",{listing});
})
//Show Route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
});
//Create Route
app.post("/listings",async(req, res)=>{
  const listing = req.body.listing;
  const newlisting = new Listing(listing);
  await newlisting.save();
  res.redirect("/listings");
})
//Edit Route
app.get("/listings/:id/edit",async(req, res)=>{
  const {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit",{listing});
})

//Update Route
app.put("/listings/:id",async(req, res)=>{
  const {id} = req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
})
// Delete Route
app.delete("/listings/:id",async(req, res)=>{
  const {id} = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log("deletedListing",deletedListing);
  res.redirect("/listings");
})


// app.get("/testListing", async (req, res) => {
//   let sampleListing = await Listing.insertMany(data);
//   res.send("Sucessful")
// });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
