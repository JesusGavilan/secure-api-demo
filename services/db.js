const config = require('../config/index');
const mongoose = require('mongoose');

exports.getConnection = () => {
    let conf = config.mongo;
    const mongoURI = 'mongodb://' + conf.username + ':' + conf.password + '@'+ conf.host + ':' + conf.port + '/'+ conf.db ;
    return mongoose.createConnection(mongoURI);
}