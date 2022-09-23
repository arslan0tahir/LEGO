const _=require('underscore');
const jwtLibCtrl = require('../controllers/libraryControllers/jwtLibCtrl')

const authenticateMW=function (req, res, next){
    let bearerToken={};
    let jwtToken='';
    let verifiedToken='';
    

    try{
        bearerToken=req.header('Authorization');
        jwtToken=bearerToken.split(" ")[1];
        verifiedToken=jwtLibCtrl.verifyToken(jwtToken);
    }
    catch(e){
        res.locals.isAuthenticated=0;
        res.locals.auth=getGuestAuth()
    }
    
    //# check if variables have defined values
    if ( !_.isUndefined(req.body.username) && !_.isUndefined(verifiedToken.username) ){

        //### verifying if tocken is not valid
        if (  req.body.username != verifiedToken.username){
            res.locals.isAuthenticated=0;
            res.locals.auth=getGuestAuth();
        }
        //### verifying if tocken is valid 
        else if (req.body.username == verifiedToken.username){
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
        res.locals.auth=getGuestAuth()
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
