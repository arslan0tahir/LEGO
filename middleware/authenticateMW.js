const _=require('underscore');
const jwtLibCtrl = require('../controllers/libraryControllers/jwtLibCtrl')
const logger=require('../logger/logger')
const LOGGER_IDENTITY=" <MW: SIGNIN> "

const authenticateMW=function (req, res, next){
    //### if its a fresh login req will contain username and password in auth

    let bearerToken={};
    let jwtToken='';
    let verifiedToken='';
    

    try{
        bearerToken=req.header('Authorization');
        jwtToken=bearerToken.split(" ")[1];
        verifiedToken=jwtLibCtrl.verifyToken(jwtToken);
    }
    catch(e){
        logger.warn(" <MW: SIGNIN> "+ e.message)
        res.locals.isAuthenticated=0;
        res.locals.auth=getGuestAuth();
    }
    
    //# check if variables have defined values
    if ( !_.isUndefined(req.body.auth.username) && !_.isUndefined(verifiedToken.username) ){

        //### verifying if tocken is not valid
        if (  req.body.auth.username != verifiedToken.username){
            res.locals.jwtToken=jwtToken;
            res.locals.isAuthenticated=0;
            res.locals.auth=getGuestAuth();
            logger.info(LOGGER_IDENTITY+ "As Guest")
        }
        //### verifying if tocken is valid 
        else if (req.body.auth.username == verifiedToken.username){
            logger.info(LOGGER_IDENTITY+ verifiedToken.username+" verified")
            res.locals.jwtToken=jwtToken;
            res.locals.isAuthenticated=1;
            res.locals.auth={            
                loggedIn:   1, 
                username:   verifiedToken.username,
                fullName:   req.body.auth.fullName,
                IsAdmin:    0,
                jwtToken:   "",
                groups:     [0],        
            } 
        }
    }
    else{
        res.locals.isAuthenticated=0;
        res.locals.auth=getGuestAuth();
        logger.info(LOGGER_IDENTITY+ "You are guest")
    }

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
