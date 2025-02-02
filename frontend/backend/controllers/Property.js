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
        console.log(file);

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

exports.editProperty = async (req, res) => {
    try {
        const { propertyId } = req.body; // Get property ID from request parameters
        const { title, location, description, price, category, tags } = req.body;
        const Broker_Id = req.user.id; // Extract broker's ID from the request

        // Find the property by ID
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found.",
            });
        }

        // Ensure that the broker updating the property is the one who created it
        if (property.BrokerId.toString() !== Broker_Id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to edit this property.",
            });
        }

        // Validate and process category
        if (category) {
            const categoryDoc = await Category.findOne({ name: category });
            if (!categoryDoc) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid category: ${category}`,
                });
            }
            property.category = categoryDoc._id;
        }

        // Validate and process tags
        if (tags) {
            if (Array.isArray(tags)) {
                property.tags = tags.map((tag) => tag.trim().toLowerCase());
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Tags must be an array of strings.",
                });
            }
        }

        // Update property details if provided
        if (title) property.title = title;
        if (location) property.location = location;
        if (price) property.price = price;
        if (description) property.description = description;

        // Save the updated property
        await property.save();

        res.status(200).json({
            success: true,
            message: "Property updated successfully.",
            updatedProperty: property,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while updating the property.",
        });
    }
};
