require('dotenv').config();

const jwt = require('jsonwebtoken');

const expiry_time = process.env.TOKEN_TIMEOUT || 60 * 15;

const generate = (user) => {
    const sign = jwt.sign( {user}, process.env.JWT_KEY, {expiresIn: `${expiry_time}  seconds`});
    return sign;
};

const verify = (token) => {
    const verify = jwt.verify(token, process.env.JWT_KEY, (error, valid) => {
        if(valid) return valid;
        else return null;
    });
    return verify;
};

module.exports = {generate, verify};