require('dotenv').config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const jwt = require("jsonwebtoken");
function generateAccessToken (username) {
    return jwt.sign({ username }, TOKEN_SECRET, { expiresIn: "43200s" });
};
 module.exports = { generateAccessToken };