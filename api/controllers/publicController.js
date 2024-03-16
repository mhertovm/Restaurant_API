const {Users, Carts} = require('../../models');
const bcrypt = require('bcrypt');
const {generateAccessToken} = require('../functions/generateAccessToken');
const {sendmail} = require('../functions/sendMail');

exports.login = async (req, res)=> {
    const {email, password} = req.body;
    try{
        const user = await Users.findOne({
            where: {email: email}
        });
        if(!user) {
            throw {
                status: 401,
                message: "User not found",
            }
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(validPassword){
            const token = generateAccessToken(user.email);
            res.status(200).json({
                jwt: token,
                id: user.id,
                name: user.name,
                surname: user.surname,
                gender: user.gender,
                age: user.age,
                phone: user.phone,
                email: user.email,
                role: user.role
            });
        } else{
            throw {
                status: 401,
                message: "Invalid password",
            }
        }
    } catch(error){
        res.status(error.status? error.status : 500).json({
            message: "Login not successful",
            error: error.message? error.message : "An error occurred",
        })
    }
};
exports.register = async (req, res)=> {
    const {name,surname,gender,age,phone,email,password} = req.body;
    if(password.length < 8){
        throw {
            status: 400,
            message: "Password less than 8 characters"}
        }
    try{
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
            role: 'user not verified',
        });
        const cart = await Carts.create({
            user_id: user.id,
            discount: 0
        });
        const token = generateAccessToken(user.email);
        sendmail(user.email, token);
        res.status(200).json({
            message: "User successfully created",
        })
    } catch(error){
        res.status(error.status? error.status : 500).json({
            message: "User not successful created",
            error: error.message? error.message : "An error occurred",
        })
    }
}