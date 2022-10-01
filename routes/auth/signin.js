const _=require('underscore');
const express = require('express');
const expressApp=require('../../libraries/expressApp.js')
const router = express.Router({mergeParams: true})
// const db=require('../../db/db')
const Cookies=require('js-cookie');

const jwtLibCtrl = require('../../controllers/libraryControllers/jwtLibCtrl');
const signinLdapCtrl=require('../../controllers/auth/signinLdap')        



//### all db operation shal be performed through controller

app=expressApp.app;
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


router.post('/',async function (req, res) {



    let progressStack=[];

    // console.log(req);
    let authResult={};
    //# authResult hold the response of authentication method 

    let authSuccess=0;
    //# 0 for failure 
    //# 1 for ldap
    //# 2 for cache and local
    //# 3 for any other 

    let authPreferred=1;
    //# 1 for ldap
    //# 2 for cache and local
    //# 3 for any other 
    
    let jwtToken="";
    //# holds jwt tocken 

    let tokenData={};
    let verifiedTokenData={};
    let authResponse={};

    // const jwtSecretKey=jwtConfig.key;
    // //# holds secret key
    
    
    //!!! check if already logged in
    if (res.locals.isAuthenticated==1){
        res.status(500).send("You are already authenticated")
        return;
    }

    //!!! check if tocken is invalid to impemented in middleware



    //### ldap authentication
    if (authPreferred==1 || authSuccess==0){
        progressStack.push("Trying: ldap authetication")
        try {   
            authResult=await signinLdapCtrl.ldapAuthenticate(req.body.auth.username, req.body.auth.password);
        } catch (error) {        
            progressStack.push("Error: ldap authetication")
            res.status(500).send(progressStack)
        }

        //validate authentication result
        if (_.has(authResult,'sAMAccountName')){
            if (authResult.sAMAccountName==req.body.auth.username){
                authSuccess=1;

                //shall be verified at office
                signinLdapCtrl.ldapCacheUserInDb(req.body.auth.username, req.body.auth.password);
                progressStack.push("Success: ldap authetication")
                
            }        
        }
        else{
            progressStack.push("Error: ldap authetication result recieved.Mismatch found")
        }
    }

    //### ldap cache or local user authentication
    if (authPreferred==2 || authSuccess==0){
        progressStack.push("Trying: local/cache authetication")            
        try { 
            //!!! Method to be defined here
        } catch (error) {     
            progressStack.push("Error: local/cache authetication")    
            console.log(error)
            res.status(500).send(progressStack)
        } 
        
        //!!! validate authenitcation results and decare success

        // if (_.has(authResult,'sAMAccountName')){
        //     if (authResult.sAMAccountName==req.body.userName){
        //         authSuccess=1;
        //         progressStack.push("Success: ldap authetication")
                
        //     }        
        // }
        // else{
        //     progressStack.push("Error: ldap authetication result recieved, but mismatch found")
        // }
    }
    




    //!!! get results from db and verify if its admin
    
    
    //### generating response based upon authentication type    
    
    //### if authentication successful, setting jwt webtocken in header
    if (authSuccess>0){
        tokenData={
            username: req.body.auth.username,
            time: Date()
        }
        jwtToken = jwtLibCtrl.generateTocken(tokenData);
        verifiedTokenData=jwtLibCtrl.verifyToken(jwtToken)
        
        //### verifying coded and decoded token 
        if (tokenData.username==verifiedTokenData.username && typeof(jwtToken)!=undefined){
            res.setHeader('Authorization', 'Bearer ' + jwtToken);
            //res.cookie(`jwtToken`,jwtToken); //server uri cookie is not being used anymore
        }
        else{
            progressStack.push("Error: tocken generation failed")    
            res.status(500).send(progressStack)
        }      
    }


    //# response for ldap authentication
    if (authSuccess==0){
        progressStack.push("Error: All athentication method failed");
        res.status(500).send(progressStack); 
    }
    else if (authSuccess==1){
        authResponse={
            loggedIn:   1, //if a valid jwt is generated
            username:   req.body.auth.username,
            fullName:   authResult.displayName,
            IsAdmin:    0,
            jwtToken:  jwtToken,
            groups:     [0],
            // renderApps:[]
        }
        res.send({auth:authResponse});
    }

    // res.status(500).send(progressStack);    

})


router.get('/', function (req, res) {
    res.send({ title: 'At Signin' })
})

module.exports = router