const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; // take token from string "Bearer TOKEN"

        if(!token) {
            return res.status(401).json({ message: 'Нет авторизации!' });
        };
        
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        req.user = decoded;
        
        next();

    } catch (error) {
        res.status(401).json({ message: 'Нет авторизации!' });
    }
};


module.exports = authMiddleware;