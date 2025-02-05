const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const auth = async(req,res,next) => {
    try{
        const token = req.cookies.token; 
        // const token = req.headers.authorization.replace("Bearer " , ""); // Bearer token
        //if missing

        if (!token) {
            return res.status(401).json({ 
                message: "No token provided, authentication failed" 
            });
        }
        //verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret key
            req.user = decoded; // Attach decoded user data to req.user
            next();
        } 
        catch (error) {
            return res.status(401).json({ 
                success:false,
                message: "Invalid token, authentication failed" 
            });
        }
    }
    catch(err){
        return res.status(401).json({ 
            success:false,
            message: "Something went wrong" 
        });
    }
}
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); // User is admin, continue
    } 
    else {
        return res.status(403).json({ 
            message: "Access Denied: Admins only" 
        });
    }
};
  
const isBroker = (req, res, next) => {
    if (req.user && req.user.role === "Broker") {
        next(); // User is broker, continue
    } 
    else {
        return res.status(403).json({ 
            message: "Access Denied: Brokers only" 
        });
    }
};
  
const isBanker = (req, res, next) => {
    if (req.user && req.user.role === "Banker") {
        next(); // User is banker, continue
    } 
    else {
        return res.status(403).json({ message: "Access Denied: Bankers only" });
    }
};
  
const isCustomer = (req, res, next) => {
    if (req.user && req.user.role === "Customer") {
        next(); // User is customer, continue
    } 
    else {
        return res.status(403).json({ 
            message: "Access Denied: Customers only" });
    }
};
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
      console.log(error)
    }
  };
  
  
// Export middleware
module.exports = {
    isAdmin,
    isBroker,
    isBanker,
    isCustomer,
    auth,
    authenticateToken
};