const cloudinary= require('cloudinary').v2;
require('dotenv').config();

exports.Cloudinary_Connect = () => {
    try{
        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        })
        console.log("Cloudinary connected successfully");
    }
    catch(err){
        console.error("Failed to connect to Cloudinary:", err.message);
        process.exit(1); // Exit the process on failure
    }
}