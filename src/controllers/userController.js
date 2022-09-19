const model = require('./../models/userModel');
const jwt = require('./authentication');
const security = require('./encryption');
const valid = require('./../validators/validations');

const login = async (request, response) => {
    if(!valid.validLogin(request.body)){
        response.status(400).end(JSON.stringify({
            status: "failed",
            message: "invalid request"
        }));
        return;
    }
    const {username, password} = request.body;
    const user = await model.findOne({where : {username: `${username}`}});
    if(user == null || !security.decrypt(password, user.password)){
        response.status(401).end(JSON.stringify({
            status: "failed",
            message: "invalid credentials"
        }));
        return;
    }
    const jwt_token = jwt.generate({
        firstName: `${user.firstName}`,
        lastName: `${user.lastName}`,
        username: `${user.username}`
    });
    response.status(200).end(JSON.stringify({
        status: "success",
        token: `${jwt_token}`
    }));
};

const signup = async (request, response) => {
    if(!valid.validSignup(request.body)){
        response.status(400).end(JSON.stringify({
            status: "failed",
            message: "invalid request"
        }));
        return;
    }
    const {firstName, lastName, username, password} = request.body;
    const isUser = await model.findOne({where : {username: `${username}`}});
    if(isUser != null){
        response.status(406).end(JSON.stringify({
            status: "failed",
            message: "user with this username already exists"
        }));
        return;
    }
    const user = {"firstName": `${firstName}`, "lastName": `${lastName}`, "username": `${username}`, "password": `${security.encrypt(password)}`};
    await model.create(user);
    response.status(200).end(JSON.stringify({
        status: "success",
        message: "user registered"
    }));
};

const auth = async (request, response) => {
    const {token} = request.body;
    if(token == undefined || token == null){
        response.status(400).end(JSON.stringify({
            status: "failed",
            message: "invalid request"
        }));
        return;
    }
    const information = jwt.verify(token);
    if(information == null || information == undefined){
        response.status(401).end(JSON.stringify({
            status: "failed",
            message: "invalid or expired token"
        }));
        return;
    }
    response.status(200).end(JSON.stringify({
        status: "success",
        user: information['user']
    }));
};

module.exports = {login, signup, auth};