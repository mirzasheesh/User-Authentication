const bcrypt = require('bcrypt');

const encrypt = (password) => {
    let salt = bcrypt.genSaltSync();
    let hashedString = bcrypt.hashSync(password, salt);
    return hashedString;
}

const decrypt = (password, hashedString) => {
    let clearString = bcrypt.compareSync(password, hashedString);
    return clearString;
}

module.exports = {encrypt, decrypt};