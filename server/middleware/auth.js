const jwt = require('jsonwebtoken');

const config = process.env;

const auth = (req, res, next) => {
    const token =  req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) 
        return res.status(401).send('Access denied. No token provided.');
    
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
    }

module.exports = auth;
