const userSchema = require('../models/users.model');
const dbService = require('../services/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

const connection = dbService.getConnection();

connection.once("open", () => {
    console.log("MongoDB database connection established successfully")
})
const User = connection.model('User', userSchema);

exports.register = (req, res, next) => {
    let hashedPwd = bcrypt.hashSync(req.body.password, 8)
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPwd
    });

    newUser.save((error, User) => {
        let token = jwt.sign({id: User._id}, config.auth.secretKey, {expiresIn: 86400});
        if (error) {
            res.status(500).send(error);
        } else {
            console.log(jwt.decode(token, {complete: true}));
            res.status(200).send({auth: true, token});
        }
    });
}

exports.getRegisteredUser = (req, res, next) => {
    let token = req.token;
    let decoded = req.decoded;
    if (!token) {
        res.status(401).send({auth:false, message: 'Token not provided'});
    } else {
        User.findById(decoded.id, {password: 0}, (error, User) => {
            if (error) {
                res.status(500).send('There was an error finding that user.');
            } else if (!User) {
                res.status(404).send('Could not locate that user');
            } else {
                res.status(200).send(User);
            }
        });
    }
}

exports.loginUser = (req, res, next) => {
    User.findOne({email: req.body.email}, (error, User) => {
        if (error) {
            res.status(500).send('There was an error with login.');
        } else if (!User) {
            res.status(404).send('User does not exists!');
        } else {
            let passwordIsValid = bcrypt.compareSync(req.body.password, User.password);
            if (!passwordIsValid) {
                res.status(401).send({auth: false, token: null});
            } else {
                let token = jwt.sign({id: User._id}, config.auth.secretKey, {expiresIn: 86400});
                res.status(200).send({auth: true, token: token});
            }
        }
    })
}

exports.verify = (req, res, next) => {
    let token = req.headers['x-json-web-token'];
    if (!token) {
        res.status(403).send({auth: false, message: 'No token provided'});
    } else {
        jwt.verify(token, config.auth.secretKey, (error, decoded) => {
            if (error) {
                res.status(500).send({auth: false, message: 'Not authorized'});
            } else {
                req.token = token;
                req.decoded = decoded;
                next();
            }
        });
    }
}