const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { WiDayCloudy } = require("react-icons/wi");

//  Register a User
exports.registerUser = catchAsyncError(async(req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        Width: 150,
        crop: "scale",
    });
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    sendToken(user,201,res);
});
<<<<<<< HEAD

=======
 
>>>>>>> ca16c58 (Add .gitignore to exclude node_modules and frontend directory)
//  Login User
exports.loginUser = catchAsyncError(async(req, res, next)=>{
    const {email, password} = req.body;

    // checking if user has given email and password both

    if(!email || !password){
        return next(new ErrorHandler("please Enter Email & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user,200,res);
});

//  Logout User
exports.logout = catchAsyncError(async(req, res, next)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Forgot Password
exports.forgotPassword = catchAsyncError(async(req, res, next)=>{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    //  Generating URL
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your password reset token is temp-- :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;
 
    try{
        await sendEmail({
            email:user.email,
            subject: `Ecommerce Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));

    }
});

// Reset Password
exports.resetPassword = catchAsyncError(async(req, res, next)=>{
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if(!user){
            return next(
                new ErrorHandler(
                    "Reset Password Token is invalid or has been expired",
                    400
                )
            );
        }

        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler("Password does not match", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken= undefined;
        user.resetPasswordExpire= undefined;

        await user.save();

        sendToken(user, 200, res);
});

//  Get User Details
exports.getUserDetails = catchAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

//  Update User Password
exports.updatePassword = catchAsyncError(async(req, res, next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

//  Update User Profile
exports.updateProfile = catchAsyncError(async(req, res, next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.files && req.files.avatar) {
        const user = await User.findById(req.user.id);
        if (user.avatar && user.avatar.public_id) {
          await cloudinary.uploader.destroy(user.avatar.public_id);
        }
        const result = await cloudinary.uploader.upload(req.files.avatar.tempFilePath, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }
     

    await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
    });
});

// Get all users (Admin)
exports.getAllUser = catchAsyncError(async(req, res, next)=>{

    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get all admins (Admin)
exports.getAllAdmins = catchAsyncError(async(req, res, next) => {
    // Assuming you have a "role" field in your User schema to determine the user's role
    const admins = await User.find({ role: 'admin' });

    if(!admins){
        return next(new ErrorHandler(`No admin exist`));
    }

    res.status(200).json({
        success: true,
        admins,
    });
});


// Get Single User (Admin)
exports.getSingleUser = catchAsyncError(async(req, res, next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user,
    });
});

//  Update User Role --Admin
exports.updateUserRole = catchAsyncError(async(req, res, next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    if(!user){
        next(new ErrorHandler("User Not found"));
    }else{
        res.status(200).json({
            success: true,
        });
    }

    
});

//  Delete User --Admin
exports.deleteUser = catchAsyncError(async(req, res, next)=>{

    const user = await User.findById(req.params.id);

    //  we will remove cloudinary later
    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))
    }

    const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);


    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    });
});

