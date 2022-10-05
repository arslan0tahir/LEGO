const ladapAuthLib=require('../../libraries/ldapAuthentication');
const db=require('../../db/db');
const logger=require('../../logger/logger')
const {bcryptVerify}=require('../../libraries/bcrypt');

const ldap={};

const LOGGER_IDENTITY=" <CTRL: SIGNIN>"


ldap.serverAuthentication=async function(userName,password){
    authResult=await ladapAuthLib.auth(userName,password);
    return authResult;
}

ldap.localAuthentication=async function(email,password){
       
    let isAuthenticated=0;
    const dbUser=await db.process.getUserByEmail(email)

    if (dbUser.email==email){
        isAuthenticated=bcryptVerify(dbUser.password,password);
        return {
            isAuthenticated:isAuthenticated,
            user:{
                email: dbUser.email,            
                fullName: dbUser.full_name
            }
        }
    }
    
    return {
        isAuthenticated:isAuthenticated,
        user:{}
    }
}

ldap.cacheUserInDb=async function(userData){
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

module.exports.ldap=ldap