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

    if (_.isEmpty(req.body) && req.method!="GET"){
        // logger.error(LOGGER_IDENTITY+"Request is empty");
        let e=err.ERROR(new Error, 'INVALID_INPUT','','emptyRequest', LOGGER_IDENTITY)
        return next(e);  
    }


    let bearerToken={};
    let jwtToken='';
    let verifiedToken='';
    let username='';
    let fullName=''
  
    let userId=0;
    let isAdmin=0;
    let isAuthenticated=0;
    let auth={};
    



    //### trying to verify token
    try{
        bearerToken=req.header('Authorization');
        jwtToken=bearerToken.split(" ")[1];
        verifiedToken=jwtLibCtrl.verifyToken(jwtToken);
    }
    catch(e){
        logger.warn(" <MW: SIGNIN> "+ e.message)
        isAuthenticated=0;
        res.locals.isAuthenticated=isAuthenticated;
        return next(); 

    }




  
    //### if tocken is valid 
    if (verifiedToken?.username){
    
        isAuthenticated=1;    
    
        res.locals.jwtToken=jwtToken;
        res.locals.verifiedToken=verifiedToken;
        res.locals.isAuthenticated=isAuthenticated;

        logger.info(LOGGER_IDENTITY+ verifiedToken.username+" verified")
        
    } 
    //### if token is invalid
    else{
     
        isAuthenticated=0;           
        res.locals.isAuthenticated=isAuthenticated;
        logger.info(LOGGER_IDENTITY+ "You are guest")


        return next();//??? should error be raised here

    }



    //### in future coding respose.local is planned to be replaced with userContext     
    //### if token is valid get userId for administration check
    userId=await db.process.getUserIdByUsernameGeneric(verifiedToken.username)
    isAdmin=await db.process.isAdmin(userId)

    if (isAdmin){logger.info(`Dear ${verifiedToken.username}, you are ADMIN....`)}
    else{logger.info(`Dear ${verifiedToken.username}, you are RESTRICTED USER....`)}

    let userContext={
        isAuthenticated:    isAuthenticated,
        isAdmin:            isAdmin,
        userId:             userId, 
    }


    httpContext.set('userContext', userContext)
    next();
}




module.exports=authenticateMW;
