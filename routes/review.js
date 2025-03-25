// const express = require ("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {  reviewSchema} = require("../schema.js"); 
// const Review = require("../models/review.js");
// const Listing = require("../models/listing.js");







// const validateReview = (req, res, next) => {
//     let { error } = reviewSchema.validate(req.body); 
//     if (error) {
//       let errMsg = error.details.map((el) => el.message).join(",");
//       throw new ExpressError(400, errMsg);
//     } else {
//       next();
//     }
//   };

// // router.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res) => {
// //     let listing = await Listing.findById(req.params.id);
// //     if (!listing) {
// //         return res.status(404).send("Listing not found");
// //     }
  
// //     console.log(req.body.review);
// //     if (!req.body.review) {
// //         return res.status(400).send("Invalid review data");
// //     }
  
// //     let newReview = new Review(req.body.review);
// //     await newReview.save(); // Save the review first
  
// //     listing.reviews.push(newReview); // Then add to listing
// //     await listing.save(); // Save the listing
  
// //     res.redirect(`/listings/${listing._id}`);
// //   }));
  
// router.post(
//     "/", 
//   validateReview, 
//    wrapAsync( async(req , res) => {
// let listing = await Listing.findById(req.params.id);
// let newReview = new Review(req.body.review);
  
//   listing.reviews.push(newReview);

//  await newReview.save();
//  await listing.save();

//  res.redirect(`/listings/${listing._id}`);
// }));



//   //delete review route
  
//   router.delete(
//     "/:reviewID",
//     wrapAsync(async (req, res) => {
//       let { id, reviewID } = req.params;
  
//       await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID}});
//       await Review.findByIdAndDelete(reviewID);
  
//       res.redirect(`/listings/${id}`);
//     })

//   );
//   module.exports = router;



const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js"); 
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


// Middleware for Review Validation


// ✅ Fix: Corrected route to include `:id`


router.post(
  "/", //only :id ok
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);



// ✅ Fix: Corrected DELETE route to include `:id`
router.delete(
  "/:reviewID",          //  "/:id/:reviewID",old          
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
