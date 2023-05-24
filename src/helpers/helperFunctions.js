const jwt = require('jsonwebtoken');

module.exports = { 
    retonaToken: (req) => {
        const token = req.headers.authorization;
        return jwt.decode(token);
    },
    validaEmail: (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    },
 };