var httpContext = require('express-http-context');
const _=require('underscore');
const ldapConfig=require('../configs/ldap')
const jwtLibCtrl = require('../controllers/libraryControllers/jwtLibCtrl')
const logger=require('../logger/logger')
const db=require('../db/db')
const err=require('../errors/errors');



const LOGGER_IDENTITY=" <MW: SIGNIN> "

const authenticateMW=async function (req, res, next){
    //### if its a fresh login req will contain username and password in auth

    if (_.isEmpty(req.body)){
        // logger.error(LOGGER_IDENTITY+"Request is empty");
        let e=err.ERROR(new Error, 'INVALID_INPUT','','emptyRequest', LOGGER_IDENTITY)
        return next(e);  
    }


    let bearerToken={};
    let jwtToken='';
    let verifiedToken='';
  
    let userId=0;
    let isAdmin=0;
    let isAuthenticated=0;
    let auth={};
    
    //### verifying tocken 
    try{
        bearerToken=req.header('Authorization');
        jwtToken=bearerToken.split(" ")[1];
        verifiedToken=jwtLibCtrl.verifyToken(jwtToken);
    }
    catch(e){
        logger.warn(" <MW: SIGNIN> "+ e.message)
        isAuthenticated=0;
        auth=getGuestAuth();

        res.locals.isAuthenticated=isAuthenticated;
        res.locals.auth=auth;
    }
    
    //### check if variables have defined values
    if ( !_.isUndefined(req.body.auth.username) && !_.isUndefined(verifiedToken.username) ){

        //### verifying if tocken is not valid
        if (  req.body.auth.username != verifiedToken.username){
            isAuthenticated=0;
            auth=getGuestAuth();

            res.locals.isAuthenticated=isAuthenticated;
            res.locals.auth=auth;
            logger.info(LOGGER_IDENTITY+ "You are guest")
        }
        //### verifying if tocken is valid 
        else if (req.body.auth.username == verifiedToken.username){
            logger.info(LOGGER_IDENTITY+ verifiedToken.username+" verified")
            isAuthenticated=1;
            auth={            
                loggedIn:   1, 
                username:   verifiedToken.username,
                fullName:   req.body.auth.fullName,
                IsAdmin:    0,
                jwtToken:   "",
                groups:     [0],        
            } 

            res.locals.jwtToken=jwtToken;
            res.locals.isAuthenticated=isAuthenticated;
            res.locals.auth=auth;
        }
    }
    else{
        isAuthenticated=0;
        auth=getGuestAuth();

        res.locals.isAuthenticated=isAuthenticated;
        res.locals.auth=auth;
        logger.info(LOGGER_IDENTITY+ "You are guest")
    }

    //### in future coding respose.local is planned to be replaced with userContext 
    
    //### get userId for administration check
    userId=await db.process.getUserIdByUsernameGeneric(auth.username)
    isAdmin=await db.process.isAdmin(userId)

    if (isAdmin){logger.info(`Dear ${auth.username}, you are ADMIN....`)}
    else{logger.info(`Dear ${auth.username}, you are RESTRICTED USER....`)}

    let userContext={
        isAuthenticated:    isAuthenticated,
        isAdmin:            isAdmin,
        userId:             userId,
        auth:               auth
    }


    httpContext.set('userContext', userContext)
    next();
}


const getGuestAuth=()=>{
    return (
        {                    
            loggedIn:   0, 
            username:   "guest",
            fullName:   "guest",
            IsAdmin:    0,
            jwtToken:   "",
            groups:     [0]            
         
        }
    )
}

module.exports=authenticateMW;
