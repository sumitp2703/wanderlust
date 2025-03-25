// class ExpressError extends Error {
//     constructor(statusCode, message) {
//         super();
//         this.statusCode = statusCode ;

//     }
// }
// module.exports = ExpressError;

class ExpressError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = Number(statusCode);  // Convert to a number
    }
}
module.exports = ExpressError;





// app.get("/listings", wrapAsync (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index", { allListings }); // ✅ Corrected path
//   }});
  