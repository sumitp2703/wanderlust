const express = require ("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema  } = require("../schema.js"); 
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner , validateListing } = require("../middleware.js");

const listingController = require ("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });


router
.route("/")
.get( wrapAsync(listingController.index))
.post( 
  isLoggedIn, 

 upload.single("listing[image]"),
 validateListing,
   wrapAsync(listingController.createListing)
  );



//new route
  // Create New Listing (POST Route)
  router.get("/new", isLoggedIn,  listingController.renderNewForm);
  
  
// Listings Route (Fixed res.render path)
// index route
router.get("/", wrapAsync(async (req, res) => {   
    const allListings = await Listing.find({});   
    res.render("listings/index", { allListings }); 
  })
);
  
  
  router
  .route("/:id")
  .get( wrapAsync(listingController.showListing))
  .put( isLoggedIn, isOwner,  upload.single("listing[image]"),  validateListing,  wrapAsync(listingController.updateListing))
  .delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); 
  

  
  
  

//   router.post("/", validateListing, wrapAsync(async (req, res) => {
//     console.log("Received Data:", req.body);
    
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
  
//     console.log("Saved to DB:", newListing);
//     res.redirect("/listings");
//   }));

  // app.post("/listings/:id/reviews", 
  //   validateReview, 
  //   wrapAsync(async (req, res) => {
  //     let listing = await Listing.findById(req.params.id);
  //     let newReview = new Review(req.body.review);
  
  //     // ❌ Missing check for `comment`
  //     listing.reviews.push(newReview);
  
  //     await newReview.save();
  //     await listing.save();
  //     res.redirect(`/listings/${listing._id}`);
  //   })
  // );
  
  
  //edit route
  router.get("/:id/edit", isLoggedIn, isOwner,  wrapAsync(listingController.renderEditForm));
  
  
// // About Us Route
// router.get("/E:\MAJORPROJECT\views\about.ejs", (req, res) => {
//   res.render("about"); // Make sure 'about.ejs' exists inside the 'views' folder
// });
 
  
 // Payment Page Route
router.get("/:id/payment", isLoggedIn, wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
      throw new ExpressError("Listing Not Found", 404);
  }
  res.render("payment", { listing });
}));


router.get("/:id/card", isLoggedIn, wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    throw new ExpressError("Listing Not Found", 404);
}
res.render("card", { listing });
}));
  
  module.exports = router;

