const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async(req, res, next)=>{
    const {token} = req.cookies; 
<<<<<<< HEAD

=======
>>>>>>> ca16c58 (Add .gitignore to exclude node_modules and frontend directory)
    if(!token){
        return next(new ErrorHandler("Please Login to access this resources", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
      } catch (error) {
        return next(new ErrorHandler("Not authorized to access this route", 401));
      }
    
}); 

exports.authorizedRoles = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};