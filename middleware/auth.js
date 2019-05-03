require("dotenv").load();
const jwt = require("jsonwebtoken");

//make sure the user is logged - Authentication
exports.loginRequired = function(req, res, next) {
    //event thoug this is async func(uses promises), we use try/cathc because if er have header that has undefined
    //as Bearer, undefined.split(" ") would return error and that's why we use try/catch here
    try{
        const token = req.headers.authorization.split(" ")[1]; // auth.="Bearer fjdlkafj", so we split
        //next step is decoding the token
        //decoded ili payload
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded) {
                return next();
                //return next as move to the next part of middleware we have, like sometthing we've
                //written in handlers that is the next step for the process
            } else{
                return next({
                    status: 401, 
                    message: "Please log in first"
                })
            }
        });
    } catch (e) {
        return next({
            status: 401, 
            message: "Please log in first"
        })
    }
    

};
//make sure we get the correct user - Authorisation 
exports.ensureCorrectUser = function(req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(error, decoded){
            if(decoded && decoded.id === req.params.id) {
                return next();
            } else { 
                return {
                    status: 401,
                    message: "Unauthorized"
                }
            }
        })
    } catch(e) {
        return next({
            status: 401,
            message: "Unauthorized"
        })
    }
};