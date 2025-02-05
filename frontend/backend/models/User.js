const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
      type: String, 
      enum: ["Broker", "Banker", "Customer"], 
      required: true 
    },
    AdditionalDetails: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Profile" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    token:{
        type:String,
    },
    resetToken:{
        type:String,
    },
    resetPassTokenExpires:{
        type:Date,
    },
    imageURL:{
        type:String,
        required:true,
    },
    properties: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property", // Reference to the Property model
        },
    ],
    loanOffers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"LoanOffer",
        }
    ],
    loanApplications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"LoanApplication",
        }
    ]
});
  
module.exports = mongoose.model("User", UserSchema);
  