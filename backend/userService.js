const jwt = require('jsonwebtoken');

SECRET_KEY = "secretkey";

//Login Authentifizierung mit JWT Token
const generateToken = (user) => {
    return jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '365d' }); //Token wird generiert und zurückgegeben
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