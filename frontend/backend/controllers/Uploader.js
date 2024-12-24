const uploadImgToCloudinary = require('../utils/cloudinaryUploads');
const isFileTypeSupported = require('../utils/cloudinaryUploads');
const File = require('../models/UploadedDocs');

exports.PropertyImgupload = async(req,res) => {
    try{
        const file  = req.files.imageFile ; 
        console.log(file);

        const supported = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        const isSupported  = isFileTypeSupported(supported , fileType);

        if(!isSupported){
            res.status(500).json({
                success:false,
                message:"File type not supported"
            })
        }

        const response = await uploadImgToCloudinary(file , "Files");
        console.log(response);

        const imageUrl = response.secure_url;

        // Step 3: Find and update the property in the database
        const { propertyId } = req.body; // Ensure propertyId is sent in the request body
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        // Add the image URL to the images array
        property.images.push(imageUrl);

        // Save the updated document
        await property.save();

        res.status(200).json({
            success:true,
            imageUrl,
            message:"Image uploaded successfully"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })

    }
}

exports.Docsupload = async(req,res) => {
    try{
        // Step 1: Extract data from the request
        const { customerId, loanOfferId, documentName } = req.body;

        // Validate required fields
        if (!customerId || !loanOfferId || !documentName) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields (customerId, loanOfferId, documentName)."
            });
        }

        // Step 2: Validate the uploaded file
        const file = req.files?.documentFile; // Ensure `documentFile` is passed
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No document file uploaded."
            });
        }

        const supported = [ "pdf"];
        const fileType = file.name.split('.')[1].toLowerCase();

        const isSupported  = isFileTypeSupported(supported , fileType);

        if(!isSupported){
            res.status(500).json({
                success:false,
                message:"File type not supported"
            })
        }

        // Step 3: Upload the file to Cloudinary (or another storage)
        const response = await uploadImgToCloudinary(file , "Files");
        console.log(response);

        // Step 4: Save document details to the database
        const document = await File.create({
            customerId,
            loanOfferId,
            documentName,
            fileUrl:response.secure_url
        });

        // Step 5: Add the document ObjectId to the LoanOffer's `uploadedDocuments`
        await LoanOffer.findByIdAndUpdate(
            loanOfferId,
            { $push: { uploadedDocuments: document._id } },
            { new: true }
        );

        // Step 6: Respond with success
        res.status(201).json({
            success: true,
            message: "Document uploaded and saved successfully.",
            data: document
        });
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })

    }
}