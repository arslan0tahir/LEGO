const _=require('underscore');
// const jwt = require('jsonwebtoken');
var express = require('express');
var expressApp=require('../../libraries/expressApp.js')
var router = express.Router({mergeParams: true})


// const jwtConfig=require('../../configs/jwt')

app=expressApp.app;
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


router.post('/',function (req, res) {
        
    //### restoring jwt tocken in header
    res.setHeader('Authorization', 'Bearer ' + res.locals.jwtToken); 
    let auth={};
    try{
        //### base on authenticate middleware response will be either guest or actual user
        if (res.locals.isAuthenticated){
            auth={            
                loggedIn:   res.locals.isAuthenticated, 
                username:   res.locals.verifiedToken.username,
                fullName:   req.body.auth.fullName,
                IsAdmin:    0,
                jwtToken:   "",
                groups:     [0],        
            } 
        }
        else{
            auth=getGuestAuth();
        }




        res.send({auth:auth});
    }
    catch(e){
        throw e

    }

})

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


module.exports = router