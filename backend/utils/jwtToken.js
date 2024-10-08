//  Creating Token and saving in cookie

const sendToken = (user, statusCode, res)=>{
    const token = user.getJWTToken();

    // options for cookie

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        secure: true,
        httpOnly:true,
        sameSite: 'None', // 'None' required for cross-origin requests with cookies in production
    };


    res.status(statusCode).cookie("token", token, options).json({
        success:true,
        user,
        token,
    });
};


module.exports = sendToken;

