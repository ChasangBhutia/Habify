const jwt = require('jsonwebtoken');

const generateToken = (email, id, timezone) => {
    return jwt.sign({ email, id, timezone}, process.env.JWT_SECRET_KEY);
}

module.exports = generateToken;