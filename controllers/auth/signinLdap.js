const ladapAuthLib=require('../../libraries/ldapAuthentication')

const ldapAuthenticate=async function(userName,password){
    authResult=await ladapAuthLib.auth(userName,password);
    return authResult
}

module.exports.ldapAuthenticate=ldapAuthenticate