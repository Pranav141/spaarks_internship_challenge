const jwt = require('jsonwebtoken');

const user = {
    email: "admin@gmail.com",
    password: "qwerty"
} 
const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Token Not Present");
    }
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err || !decoded || decoded.email !== user.email || decoded.password !== user.password) {
            console.log("Invalid Token");
            return res.status(401).send("Invalid Token");
        }
        next();
    });
}

module.exports = auth;