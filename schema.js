// const Joi = require('joi');

// module.exports.listingSchema = Joi.object({
//     listing : Joi.object({
//         title:  Joi.string().required(),
//         description: Joi.string().required(),
//         location: Joi.string().required(),
//         price: Joi.number().required().min(0),
//         image: Joi.string().allow("", null),


//     }).required()
// })
// const Joi = require("joi");

// const listingSchema = Joi.object({
//   listing: Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     price: Joi.number().required().min(0),
//     location: Joi.string().required(),
//     country: Joi.string().required(),
//     image: Joi.string().trim().uri({ allowRelative: true }).required() // More flexible URL validation
//   }).required()
// });

// module.exports = { listingSchema };

const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    image: Joi.string().optional() // No validation, optional field
  }).required()
});

module.exports = { listingSchema };



module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required() 
  }).required(),
});


