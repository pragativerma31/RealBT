const express = require("express")
const { auth, isAdmin } = require("../middlewares/Auth");
const { createcategory, ShowAllcategory, deleteCategory, updateCategory } = require("../controllers/category");
const router = express.Router()


// ********************************************************************************************************
//                                      Category routes
// ********************************************************************************************************

//create category
router.post("/createCategory" , createcategory);//,auth , isAdmin,

//showAll categories
router.get("/getAllCategories" , ShowAllcategory); //,auth , isAdmin

//delete category
router.get("/deleteCategories/:id",auth , isAdmin , deleteCategory);

//update category
router.get("/updateCategory/:id",auth , isAdmin , updateCategory);


module.exports = router