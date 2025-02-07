const Property = require('../models/Property');
const User = require('../models/User');
const {uploadImgToCloudinary} = require('../utils/cloudinaryUploads');
const {isFileTypeSupported} = require('../utils/cloudinaryUploads');
const Category =  require('../models/category');

exports.createProperty = async(req,res) => {
    //data fetch
    try {
        const { title, location, description, price, category,amenities } = req.body;
        let {tags} = req.body
        // Check if a file is uploaded
        const file = req.files.thumbnailImage

        if (!file || !req.files ) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        // Validate file type
        const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!isFileTypeSupported(supportedTypes, file)) {
            return res.status(400).json({
                success: false,
                message: `Unsupported file type. Supported types are: ${supportedTypes.join(', ')}`,
            });
        }
        // Validate input data
        if (!title || !location || !price || !description ||!category ||!amenities) {
            return res.status(400).json({
                success: false,
                message: "Fill in all the required boxes."
            });
        }

        //details of broker
        const Broker_Id = req.user.id;
        const Brokerdetails = await User.findOne({_id:Broker_Id});

        if(!Brokerdetails){
            return res.status(404).json({
                success:false,
                message:"Broker Not Found"
            })
        }

        // Validate and process tags
        if (typeof(tags) === "string") {
            try {
                tags = JSON.parse(tags); // Convert to an array if stringified
            } catch (error) {
                console.error("Invalid tags format:", error);
            }
        }
        let processedTags = [];
        if (tags && Array.isArray(tags)) {
            processedTags = tags.map((tag) => tag.trim().toLowerCase());
        } else if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string')) {
            return res.status(400).json({
                success: false,
                message: "Tags must be an array of strings.",
            });
        }

        // Find the category ObjectId
        const categoryDoc = await Category.findOne({ _id: category });
        if (!categoryDoc) {
            return res.status(400).json({
                success: false,
                message: `Invalid category: ${category}`,
            });
        }

        // Step 1: Save the property without images
        const propertydetails = await Property.create({
            title,
            location,
            price,
            description,
            category:categoryDoc._id,
            BrokerId:Broker_Id,
            tags:processedTags,
        });
        
        const result = await uploadImgToCloudinary(file.tempFilePath , "RealBT/Properties/Thumbnails" , false);

        propertydetails.thumbnailImage = result.secure_url;
        await propertydetails.save();


        Brokerdetails.properties.push(propertydetails._id); // Add the property ID to the broker's properties array
        await Brokerdetails.save();


        // Step 4: Respond with the created property
        res.status(201).json({
            success: true,
            message: "Property created successfully.",
            propertydetails
        });

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong during creating post for property"
        })
    }
    
} 

exports.deleteProperty = async (req, res) => {
    try {
        const Broker_Id = req.user.id; // Extract broker's ID from the request (Authenticated User)
        const { propertyId } = req.params; // Extract property ID from request parameters

        // Find the property to ensure it belongs to the logged-in broker
        const property = await Property.findOne({ _id: propertyId, BrokerId: Broker_Id });

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found or does not belong to this broker.",
            });
        }

        // Delete the property
        await Property.findByIdAndDelete(propertyId);

        res.status(200).json({
            success: true,
            message: "Property deleted successfully.",
        });

    } catch (error) {
        console.error("DELETE PROPERTY ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the property.",
        });
    }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    // Fetch all properties from the database
    const AllProperties = await Property.find().populate("category" , "name");

    // Check if properties exist
    if (!AllProperties.length) {
      return res.status(404).json({ 
        success:false,
        message: "No properties found" });
    }

    // Return the properties with a success response
    return res.status(200).json({
      success: true,
      AllProperties
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};


exports.fetchBrokersProperty = async (req, res) => {
    try {
        const Broker_Id = req.user.id; // Extract broker's ID from the request (Authenticated User)

        // Fetch all properties associated with the logged-in broker
        const properties = await Property.find({ BrokerId: Broker_Id });
        // If no properties are found
        if (!properties || properties.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No properties found for this broker.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Properties fetched successfully.",
            properties,
        });

    } catch (error) {
        console.error("FETCH BROKERS PROPERTY ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching broker's properties.",
        });
    }
};


exports.editProperty = async (req, res) => {
    try {
        const Broker_Id = req.user.id; // Authenticated broker
        const { propertyId } = req.params; // Property ID from request params
        let { title, location, description, price, category, amenities, tags } = req.body;

        // Find the property and ensure it belongs to the broker
        let property = await Property.findOne({ _id: propertyId, BrokerId: Broker_Id });

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found or does not belong to this broker.",
            });
        }

        // Validate and process tags
        if (typeof tags === "string") {
            try {
                tags = JSON.parse(tags); // Convert to an array if stringified
            } catch (error) {
                console.error("Invalid tags format:", error);
            }
        }
        let processedTags = [];
        if (tags && Array.isArray(tags)) {
            processedTags = tags.map((tag) => tag.trim().toLowerCase());
        } else if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string')) {
            return res.status(400).json({
                success: false,
                message: "Tags must be an array of strings.",
            });
        }

        // Find the category ObjectId
        const categoryDoc = await Category.findOne({ _id: category });
        if (!categoryDoc) {
            return res.status(400).json({
                success: false,
                message: `Invalid category: ${category}`,
            });
        }

        // Check if a new file is uploaded for the thumbnail image
        if (req.files && req.files.thumbnailImage) {
            const file = req.files.thumbnailImage;

            // Validate file type
            const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!supportedTypes.includes(file.mimetype)) {
                return res.status(400).json({
                    success: false,
                    message: `Unsupported file type. Supported types are: ${supportedTypes.join(', ')}`,
                });
            }

            // Upload the new image to Cloudinary
            const result = await uploadImgToCloudinary(file.tempFilePath, "RealBT/Properties/Thumbnails", false);
            property.thumbnailImage = result.secure_url; // Update thumbnail image
        }

        // Update the property details
        property.title = title || property.title;
        property.location = location || property.location;
        property.description = description || property.description;
        property.price = price || property.price;
        property.category = categoryDoc._id || property.category;
        property.amenities = amenities || property.amenities;
        property.tags = processedTags.length ? processedTags : property.tags;

        // Save the updated property
        await property.save();

        res.status(200).json({
            success: true,
            message: "Property updated successfully.",
            property,
        });

    } catch (error) {
        console.error("EDIT PROPERTY ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while updating the property.",
        });
    }
};


