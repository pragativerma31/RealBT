const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const propertyRoutes = require('./routes/Property');
const loanofferRoutes = require('./routes/loanoffer');
const categoryRoutes = require('./routes/category');
const resetpassRoutes = require('./routes/resetPass');


const database = require('./config/databse');
const cookieparser =require('cookie-parser')
const cors = require('cors');
const {Cloudinary_Connect} = require('./config/cloudinary');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const { application } = require('express');

dotenv.config()
const PORT = process.env.PORT

database.connect();

Cloudinary_Connect();


app.use(express.json());
app.use(cookieparser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

app.use("/api/v1/auth" ,userRoutes);
app.use("/api/v1/profile" ,profileRoutes);
app.use("/api/v1/properties" ,propertyRoutes);
app.use("/api/v1/categories" ,categoryRoutes );
app.use("/api/v1/loanOffers" ,loanofferRoutes);
app.use("/api/v1/password" , resetpassRoutes);

app.get("/" , (req,res) => {
    return res.json({
        message:"Your server is up",
        success:true,
    })
});

app.listen(PORT , () => {
    console.log(`App is running at ${PORT}`)
})

