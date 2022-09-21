const jwt = require('jsonwebtoken');
const jwtConfig=require('../configs/jwt')

const generateTocken=(data)=>{
    const jwtSecretKey=jwtConfig.key;
    jwtToken = jwt.sign(data, jwtSecretKey);
    return jwtToken
}

const verifyTocken=(token)=>{

    const jwtSecretKey=jwtConfig.key;
    const data = jwt.verify(token, jwtSecretKey)
    return data

}


module.exports.generateTocken=generateTocken;
module.exports.verifyTocken=verifyTocken;