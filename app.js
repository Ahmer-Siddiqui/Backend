const express = require("express");
const app = express();
const { PORT } = require("dotenv").config().parsed;
const ejsMate = require("ejs-mate");
const path = require("path");
const Listing = require("./models/listingModel");
const { data } = require("./init/data");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const port = PORT || 5000;

//Database connection
require("./db/connect")();

// template engine config
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));



app.use("/listings", require("./routes/listingsRoutes"));

// app.get("/testListing", async (req, res) => {
//   let sampleListing = await Listing.insertMany(data);
//   res.send("Sucessful")
// });

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something Went Wrong" } = err;

  res.status(statusCode).render("error", { message });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${PORT}`);
});
