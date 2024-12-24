const category = require('../models/category');

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
                message:"Category already exists ,  try and make a new one",
                exists,
            })
        }

        const categorydetails = await category.create({
            name:name,
            description:description,
        })

        console.log(categorydetails);

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
            message:"All category returned",
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