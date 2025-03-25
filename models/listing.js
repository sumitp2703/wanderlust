const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js"); //its shdqvhvqgcqgcdgqcdgqcxcq
// const { listingSchema } = require("../schema");
const { listingSchema } = require("../schema");
const { string } = require("joi");


const ListingSchema = new Schema({
    title: { type: String, required: true }, // ✅ Corrected
    description: { type: String }, // ✅ Explicitly defined type
    image: {
      url: String,
      filename: String,
    } ,
    price: { type: Number }, // ✅ Defined type explicitly
    location: { type: String },
    country: { type: String },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

});

// listingSchema.post("findOneAndDelete", async (listing) => {
//   if (listing) {
//     await Review.deleteMany({ _id:  { $in: listing.reviews}});
//   }
// });


const Listing = mongoose.model("Listing", ListingSchema); // ✅ Fixed variable name
module.exports = Listing; // ✅ Fixed export
