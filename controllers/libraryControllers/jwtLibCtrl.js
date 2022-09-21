const jwt=require('../../libraries/jwt')

const generateTocken=jwt.generateTocken
const verifyTocken=jwt.verifyTocken

module.exports.generateTocken=generateTocken;
module.exports.verifyTocken=verifyTocken;
