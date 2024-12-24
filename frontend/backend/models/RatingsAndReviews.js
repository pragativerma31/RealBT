const mongoose = require("mongoose");

const RatingReviewSchema = new mongoose.Schema({
    // Reference to User (broker/banker) being reviewed
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    // Reference to Property being reviewed
    propertyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Property" 
    },
    reviewerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    rating: { 
        type: Number, 
        min: 1, 
        max: 5, 
        required: true 
    },
    review: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});
  
  module.exports = mongoose.model("RatingsAndReviews", RatingReviewSchema);
  