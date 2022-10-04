const bcrypt=require('bcrypt');

const saltRounds=10
bcryptHash=function(password){
    return bcrypt.hashSync(password, saltRounds)
}

bcryptVerify=function(passwordHash, textPassword){
    
    return bcrypt.compareSync(textPassword,passwordHash)
}

module.exports.bcryptHash=bcryptHash
module.exports.bcryptVerify=bcryptVerify