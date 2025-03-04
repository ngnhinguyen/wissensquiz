const jwt = require('jsonwebtoken');

SECRET_KEY = "secretkey";

const generateToken = (user) => {
    return jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '365d' });
};

const verifyToken = (token, callback) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            callback(err, null);

        } else {
            callback(null, decoded);
        }
    });
};

module.exports = {
    generateToken,
    verifyToken
};