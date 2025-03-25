// const Listing = require("./models/listing");


// module.exports.isLoggedIn = (req, res , next) => {
//   if (!req.isAuthenticated()) {
//     req.session.redirectUrl = req.originalUrl;
//     req.flash("error" , " you must be logged in to create a new listing");
//         return res.redirect("/login");
//   }
//   next();
// };

// module.exports.saveRedirectUrl = (req, res, next) => {
//   if (!req.session.redirectUrl) {
//     res.locals.redirectUrl = req.session.redirectUrl;
//   }
//   next();
// };

// module.exports.isOwner =  async (req, res , next ) => {
//   let { id } = req.params;
// let listing = await Listing.findById(id);
// // if(!listing.owner.equals(res.locals.currUser_id)){
//   if(! currUser && listing.owner.equals(res.locals.currUser_id)){
//   req.flash("error", "you do not owner of the listings");
//  return res.redirect(`/listings/${id}`);
// }
// next();
// }
const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema  } = require("./schema.js"); 
const { reviewSchema } = require("./schema.js"); 

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Save URL before redirecting
    req.flash("error", "You must be logged in to create a new listing");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl; // Save the redirect URL properly
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    if (!req.user || !listing.owner.equals(req.user._id)) { // ✅ Fixed condition
      req.flash("error", "You do not own this listing");
      return res.redirect(`/listings/${id}`);
    }

    next();
  } catch (err) {
    next(err); // Pass error to Express error handler
  }
};


module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body, { abortEarly: false }); 
  if (error) {
    console.log("Validation Error:", error.details);
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body); 
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
};
