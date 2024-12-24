const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: { 
        type: String 
    },
    property:[
        {
           type: mongoose.Schema.Types.ObjectId,
            ref: "Property"  
        }
    ]     
});

module.exports = mongoose.model("Category", CategorySchema);
