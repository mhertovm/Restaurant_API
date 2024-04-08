const {Users, Carts} = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateAccessToken} = require('../functions/generateAccessToken');
const {sendmail} = require('../functions/sendMail');
const logger = require('../logger/logger');

exports.login = async (req, res)=> {
    const {email, password} = req.body;
    try{
        const user = await Users.findOne({
            where: {email: email},
        });
        if(!user) {
            throw {
                status: 404,
                message: "User not found",
            };
        };
        const validPassword = await bcrypt.compare(password, user.password);
        if(validPassword && (user.role === 'user_verified' || user.role === 'admin')){
            const token = generateAccessToken(user.email);
            res.status(200).json({
                jwt: token,
                role: user.role
            });
        } else if(validPassword && user.role === 'user_not_verified'){
            const token = generateAccessToken(user.email, "180s");
            console.log(token);
            sendmail(user.email, token);
            res.status(200).json({
                message: "the token is addressed to the email",
                role: user.role
            });
        } else{
            throw {
                status: 401,
                message: "Invalid password",
            };
        };
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "Login not successful",
            error: error.message
        });
    };
};
exports.register = async (req, res)=> {
    const {name,surname,gender,age,phone,email,password} = req.body;
    try{
        if(password.length < 8){
            throw {
                status: 400,
                message: "Password less than 8 characters"
            };
        };
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        const user =  await Users.create({
            name,
            surname,
            gender,
            age,
            phone,
            email,
            password: hashed_password,
            role: 'user_not_verified',
        });
        Carts.create({
            user_id: user.id,
            discount: 0
        });
        const token = generateAccessToken(user.email, "180s");
        sendmail(user.email, token);
        res.status(201).json({
            message: "User successfully created",
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "User not successful created",
            error: error.message
        });
    };
};
exports.verify = (req, res)=> {
    const token = req.params.token
    const JWT_SECRET = process.env.JWT_SECRET
    try{
        jwt.verify(token, JWT_SECRET, (error) => {
            if (error) {
                throw {
                    status: 403,
                    message: 'token is not valid'
                };
            } else {
                const decoded = jwt.decode(token)
                const email = decoded.email
                Users.update(
                    {role: 'user_verified'},
                    {where:{email}}
                );
                res.status(200).json('user_verified');
            };
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to verify",
            error: error.message
        });
    };
};