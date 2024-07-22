const listingSchema = require("../schema");
const ExpressError = require("../utils/ExpressError");


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      throw new ExpressError(400, error.message);
    } else {
      next()
    }
  };
  module.exports = validateListing;