const Sequelize = require("sequelize")
const developement = require("../config/sequlizeConfig")
const config = developement

const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const dbConnect = () =>{
    return sequelize
    .sync({})
    .then(()=>{
        console.log("database sync complete")
    })
    .catch(err =>{
        throw err;
    })
}

module.exports = {dbConnect, db}