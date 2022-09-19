const validSignup = (body) => {
    if(body.firstName == undefined || body.lastName == undefined || body.username == undefined || body.password == undefined) return false;
    return true;
};

const validLogin = (body) => {
    if(body.username == undefined || body.password == undefined) return false;
    return true;
};

module.exports = {validSignup, validLogin};