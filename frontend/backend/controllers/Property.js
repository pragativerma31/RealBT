const Property = require('../models/Property');
const User = require('../models/User');
const uploadImgToCloudinary = require('../utils/cloudinaryUploads');
const isFileTypeSupported = require('../utils/cloudinaryUploads');
const Category =  require('../models/category');

exports.createProperty = async(req,res) => {
    //data fetch
    try {
        const { title, location, description, price, category,tags } = req.body;

        // Validate input data
        if (!title || !location || !price || !description ||!category) {
            return res.status(400).json({
                success: false,
                message: "Fill in all the required boxes."
            });
        }

        console.log(tags)
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
        let processedTags = [];
        if (tags && Array.isArray(tags)) {
            processedTags = tags.map((tag) => tag.trim().toLowerCase());
        } else if (tags) {
            return res.status(400).json({
                success: false,
                message: "Tags must be an array of strings.",
            });
        }
        // Find the category ObjectId
        const categoryDoc = await Category.findOne({ name: category });
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

        // Step 2: Handle image uploads (if any)
        // const files = req.files?.imageFiles; // Assuming `imageFiles` is an array of uploaded images
        // if (files && files.length > 0) {
        //     const supported = ["jpg", "jpeg", "png"];
        //     const imageUrls = [];

        //     // Validate and upload each image
        //     for (const file of files) {
        //         const fileType = file.name.split('.')[1].toLowerCase();

        //         if (!isFileTypeSupported(supported, fileType)) {
        //             return res.status(400).json({
        //                 success: false,
        //                 message: `Unsupported file type: ${fileType}`
        //             });
        //         }

        //         const response = await uploadImgToCloudinary(file, "PropertyImages");
        //         imageUrls.push(response.secure_url);
        //     }

        //     // Step 3: Update the property with the uploaded image URLs
        //     propertydetails.images = imageUrls;
        //     await propertydetails.save();
        // }

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