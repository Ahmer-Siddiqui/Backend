const listingSchema = require("../schema");
const ExpressError = require("../utils/ExpressError");

const validateListing = async(req, res, next) => {
  try {
    let { error } = await listingSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  } catch (error) {
    next(error)
  }
};
module.exports = validateListing;