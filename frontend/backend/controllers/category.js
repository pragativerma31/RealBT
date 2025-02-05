const category = require('../models/category');
const Property = require('../models/Property')

exports.createcategory = async(req,res) => {
    try {
        const {name , description} =req.body;

        //validation
        if(!name || !description){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        const exists = await category.findOne({name:name})
        if(exists){
            return res.status(401).json({
                success:false,
                message:"Category already exists ,  try and make a new one or Update the existing One",
                exists,
            })
        }

        const categorydetails = await category.create({
            name:name,
            description:description,
        })


        return res.status(200).json({
            success:true,
            message:"Category created Successfully"
        })
    } 
    catch (error) {
        console.log(error)
        return res.status(403).json({
            success:false,
            message:"Something went wrong , while creating category"
        })
    }
}
exports.ShowAllcategory = async(req,res) => {
    try {
        const allcategory =await category.find({} , {name:true});

        return res.status(200).json({
            success:true,
            message:"All categories returned",
            allcategory,
        })
    } 
    catch (error) {
        return res.status(403).json({
            success:false,
            message:"Something went wrong , while returning all tags"
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Validate the category ID
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required",
            });
        }

        // Check if the category exists
        const exists = await category.findById(categoryId);
        if (!exists) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Remove category reference from all related properties
        await Property.updateMany(
            { category: categoryId },
            { $unset: { category: "" } } // Removes the category field from properties
        );

        // Delete the category
        await category.findByIdAndDelete(categoryId);

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the category",
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params; // Extract category ID from route params
        const { description } = req.body; // Extract new description from the request body

        // Validate input
        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Description is required",
            });
        }

        // Check if the category exists
        const existingcategory = await category.findById(id);
        if (!existingcategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Update the category description
        existingcategory.description = description;
        await existingcategory.save();

        return res.status(200).json({
            success: true,
            message: "Category description updated successfully",
            category,
        });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the category",
        });
    }
};
