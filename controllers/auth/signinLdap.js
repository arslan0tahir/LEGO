const ladapAuthLib=require('../../libraries/ldapAuthentication');
const db=require('../../db/db');
const logger=require('../../logger/logger')


const LOGGER_IDENTITY=" <CTRL: SIGNIN>"
const ldapAuthenticate=async function(userName,password){
    authResult=await ladapAuthLib.auth(userName,password);
    return authResult;
}

const ldapCacheUserInDb=async function(userData){
    let user={
        email:      userData.email,
        password:   userData.password,
        authentication_type: userData.authentication_type,
        full_name   : userData.full_name
    }
    
    //### return id if user alredy exist
    let userId=await db.process.getUserIdByEmail(user.email)

    if (userId){
        //### update user in db
        isUpdated=await db.process.updateUser(userId,{password:   userData.password})
        if (isUpdated){
            logger.info(LOGGER_IDENTITY,`cached ldap user ${user.email} updated `);
        }else{
            logger.warn(LOGGER_IDENTITY,`cache failed ${user.email} `);
        }
    }
    else{
        //### create user in db
        let insertId=await db.process.createUser(user)
        if (typeof insertId== 'number'){
            logger.info(LOGGER_IDENTITY,`cached ldap user ${user.email} with insertId ${insertId} `);
        }
        else{
            logger.warn(LOGGER_IDENTITY,`cache failed ${user.email} `);
        }

    }
    // db.process.updateUser(id,data)
}

module.exports.ldapAuthenticate=ldapAuthenticate
module.exports.ldapCacheUserInDb=ldapCacheUserInDb;
