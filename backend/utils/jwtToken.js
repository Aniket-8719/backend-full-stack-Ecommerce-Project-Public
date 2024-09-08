//  Creating Token and saving in cookie

const sendToken = (user, statusCode, res)=>{
    const token = user.getJWTToken();

    // options for cookie
<<<<<<< HEAD
   const options = {
    expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === 'production', // Use `true` for production environment
    httpOnly: true,
    sameSite: 'Lax',  // Required for cross-origin cookies
};
=======
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        secure:false,
        httpOnly:true,
        sameSite: 'Lax',  // Required for cross-origin cookies
    };
>>>>>>> ca16c58 (Add .gitignore to exclude node_modules and frontend directory)

    res.status(statusCode).cookie("token", token, options).json({
        success:true,
        user,
        token,
    });
};

<<<<<<< HEAD
module.exports = sendToken;
=======
module.exports = sendToken;
>>>>>>> ca16c58 (Add .gitignore to exclude node_modules and frontend directory)
