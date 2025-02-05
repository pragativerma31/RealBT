const mongoose = require("mongoose");

const LoanTypsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: { 
        type: String 
    },
    loanApplication:[
        {
           type: mongoose.Schema.Types.ObjectId,
            ref: "LoanApplication"  
        }
    ]     
});

module.exports = mongoose.model("LoanTypes", LoanTypsSchema);
