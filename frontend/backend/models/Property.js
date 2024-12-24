const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    BrokerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String 
    },
    images: [{ 
        type: String 
    }],
    postedAt: { 
        type: Date, 
        default: Date.now 
    },
    loanOffers: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "LoanOffer"
      }
    ],
    RatingsAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "RatingsAndReviews"
        }
    ],
    AverageRating: { 
        type: Number, 
        default: 0 
    }, 
    category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category" 
    },
    tags:[{
        type:String,
    }]
});
  
  module.exports = mongoose.model("Property", PropertySchema);
  