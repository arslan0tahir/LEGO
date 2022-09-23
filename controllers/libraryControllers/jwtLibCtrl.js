const jwt=require('../../libraries/jwt')

const generateTocken=jwt.generateTocken
const verifyToken=jwt.verifyTocken

module.exports.generateTocken=generateTocken;
module.exports.verifyToken=verifyToken;
