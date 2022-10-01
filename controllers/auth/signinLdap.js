const ladapAuthLib=require('../../libraries/ldapAuthentication');
const db=require('../../db/db');

const ldapAuthenticate=async function(userName,password){
    authResult=await ladapAuthLib.auth(userName,password);
    return authResult;
}

const ldapCacheUserInDb=async function(username,password){
    let user={
        username:username,
        password:password,
        authentication_type: 'ldap'
    }
    
    //### return id if user alredy exist
    let userId=await db.process.getUserId(username)

    if (id){
        //### update user in db
        await db.process.updateUser(id,user)
    }
    else{
        //### create user in db
        await db.process.createUser(user)
    }
    // db.process.updateUser(id,data)
}

module.exports.ldapAuthenticate=ldapAuthenticate
module.exports.ldapCacheUserInDb=ldapCacheUserInDb;
