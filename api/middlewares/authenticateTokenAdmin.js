require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const {Users} = require("../../models");

function authenticateTokenAdmin(req, res, next) {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    if (token == null){
        return res.sendStatus(401)
    }
    jwt.verify(token, SECRET, (err) => {
        if (err) {
          return res.sendStatus(403)
        };
        Users.findOne({
            where: {
                email: decoded.email
            }
        }).then((user)=>{
            if(user.role !== "admin"){
                return res.sendStatus(403);
            };
            next();
        });
    });
};
module.exports = { authenticateTokenAdmin }