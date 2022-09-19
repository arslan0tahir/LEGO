const _=require('underscore');

var express = require('express');
var expressApp=require('../../libraries/expressApp.js')
var signinLdapCtrl=require('../../controllers/auth/signinLdap')
var router = express.Router({mergeParams: true})


app=expressApp.app;
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


router.post('/',async function (req, res) {
    // console.log(req);
    let authResult

    try {   
        authResult=await signinLdapCtrl.ldapAuthenticate(req.body.userName, req.body.password);
    } catch (error) {        
        console.log(error)
        res.status(500).send(error)
    }

    if (_.has(authResult,'userPrincipalName')){
        //go for jwt tocken generation
        authResponse={
            username: "TEST",
            IsAdmin: 0,
            jwtTocken:"sdasdsadsadasd",
            groups:[0],
        }

        res.send(authResponse);
    }
    else if (_.has(authResult,'lde_message')){
        //go for cahce authentication from db
        //if successful go for jwt authentication
        res.status(500).send("Authentication Failure")
    }
    else{
        res.status(500).send("Authentication Failure")
    }

    // res.status(500).send(error);
    

})


router.get('/', function (req, res) {
    res.send({ title: 'At Signin' })
})

module.exports = router