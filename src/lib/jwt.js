const jwt = require('jsonwebtoken');
const secretKey = require('../../config/secretKey').key;

module.exports = {
    sign : function(id, grade) {
        const options = {
            algorithm : "HS256",
            expiresIn : 60 * 60 * 24 * 1095 // 1095 days
        };
        const payload = {
            "id" : id,
            "company" : grade,
        };
        let token
        token = jwt.sign(payload, secretKey, options);
        return token;
    },

    verify : function(token) {
        let decoded
        decoded = jwt.verify(token, secretKey);
        if(!decoded) {
            return -1;
        }else {
            return decoded;
        }
    }
};