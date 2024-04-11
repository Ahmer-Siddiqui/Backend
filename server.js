const express = require("express");
const app = express();
const { PORT } = require("dotenv").config().parsed;
const path = require("path");
const Listing = require("./models/listingModel");
const methodOverride = require("method-override");
const { data } = require("./init/data");

//Database connection
const connectDB = require("./db/connect")();

// template engine config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/listings", require("./routes/listingsRoutes"));

// app.get("/testListing", async (req, res) => {
//   let sampleListing = await Listing.insertMany(data);
//   res.send("Sucessful")
// });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
