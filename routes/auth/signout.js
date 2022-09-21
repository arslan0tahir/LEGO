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


router.post('/',async function (req, res) {
    
    //### removing jwt tocken from header
    res.setHeader('Authorization', 'Bearer');

    //### removing cookie
    res.clearCookie("jwtToken");

    const authResponse={
        loggedIn: 0, //if a valid jwt is generated
        username: "guest",
        fullName: "guest",
        IsAdmin: 0,
        jwtTocken:"",
        groups: [0],
        // renderApps:[]
    }

    res.send(authResponse);
})


router.get('/', function (req, res) {
    res.status(500).send("Currently Unavailable")
})

module.exports = router