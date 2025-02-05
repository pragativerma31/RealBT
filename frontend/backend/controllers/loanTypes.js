const LoanTypes =  require('../models/loanTypes');

exports.createLoanType = async(req,res) => {
    try {
        const {name , description} =req.body;

        //validation
        if(!name || !description){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        const exists = await LoanTypes.findOne({name:name})
        if(exists){
            return res.status(401).json({
                success:false,
                message:" Loan type already exists ,  try and make a new one or Update the existing One",
                exists,
            })
        }

        const LoanTypedetails = await LoanTypes.create({
            name:name,
            description:description,
        })



        return res.status(200).json({
            success:true,
            message:"loan Type created Successfully"
        })
    } 
    catch (error) {
        console.log(error)
        return res.status(403).json({
            success:false,
            message:"Something went wrong , while creating Loan type"
        })
    }
}


exports.fetchLoanTypes = async (req, res) => {
    try {
        // Fetch all loan types with their associated loan applications
        const loanTypes = await LoanTypes.find().populate("loanApplication");

        res.status(200).json({
            success:true,
            message: "Loan types fetched successfully",
            loanTypes
        });

    } catch (error) {
        console.error("Error fetching loan types:", error);
        res.status(500).json({ 
            success:false,
            message: "Internal server error" 
        });
    }
};
