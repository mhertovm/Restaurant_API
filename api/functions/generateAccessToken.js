require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
function generateAccessToken (email, time) {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: time? time : "86400s" });
};
module.exports = {generateAccessToken};