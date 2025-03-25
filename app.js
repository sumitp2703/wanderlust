// Load environment variables in development mode
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}


// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ExpressError = require("./utils/ExpressError.js");
// const Listing = require("../models/listing");

const router = express.Router();

// Import models & routes
const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Initialize express app
const app = express();

// MongoDB Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}
main();

// Setup view engine & middleware
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // Enhances security
  },
};
app.use(session(sessionOptions));
app.use(flash());

// Passport authentication setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash messages & current user middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Render About Page
app.get("/about", (req, res) => {
  res.render("about");
});

// Render Newsroom page
app.get("/newsroom", (req, res) => {
  res.render("newsroom");
});

// render blog page
app.get("/blog", (req, res) => {
  res.render("Blog");
});

// render feedback page
app.get("/feedback", (req, res) => {
  res.render("feedback");
});

app.post("/feedback", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Feedback received from ${name} (${email}): ${message}`);
  req.flash("success", "Thank you for your feedback!");
  res.redirect("/feedback");
});

// render cpmplan page
app.get("/complaint", (req, res) => {
  res.render("complaint");
});

app.post("/complaint", (req, res) => {
  const { name, email, issueType, message } = req.body;
  console.log(`Complaint received from ${name} (${email}): ${issueType} - ${message}`);
  req.flash("success", "Your complaint has been submitted. We will get back to you soon.");
  res.redirect("/complaint");
});


// render fq
app.get("/fq", (req, res) => {
  res.render("fq");
});

// render privacy
app.get("/privacy", (req, res) => {
  res.render("privacy");
});

// render privacy
app.get("/terms", (req, res) => {
  res.render("terms");
});


// render privacy
app.get("/company-details", (req, res) => {
  res.render("company-details");
});


// render gallary
app.get("/gallary", (req, res) => {
  res.render("gallary");
});

// render contactus
app.get("/contactus", (req, res) => {
  res.render("contactus");
});


app.get("/button", (req, res) => {
  res.render("button");
});




app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// 404 Error Handling Middleware
app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

// General Error Handling Middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// Start server
const PORT = 1437;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
