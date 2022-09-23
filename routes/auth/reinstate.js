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
    
    try{
        //### base on authenticate middleware response will be either guest or actual user
        res.send({auth:res.locals.auth});
    }
    catch(e){
        res.status(500).send("Unknown reinstate response")
    }

})


module.exports = router