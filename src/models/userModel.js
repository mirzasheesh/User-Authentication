require('dotenv').config()

const Sequelize = require('sequelize');

const database = 'users';
const host = process.env.DBhost;
const port = process.env.DBport || 3306;
const user = process.env.DBuser;
const pass = process.env.DBpass;

const sequelize = new Sequelize(database, user, pass, {
    host: host,
    port: port,
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate().then((data) => {
    console.log("Database connected")
}).catch((error) => {
    console.log("Error in database connection");
});

const table = 'users_information';

const columns = {
    firstName: {
        type: Sequelize.DataTypes.STRING
    },
    lastName: {
        type: Sequelize.DataTypes.STRING
    },
    username: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: Sequelize.DataTypes.STRING
    }
};

const model = sequelize.define(table, columns, {timestamps: false});

sequelize.sync({force: false});

module.exports = model;