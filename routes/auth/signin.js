const _=require('underscore');
const express = require('express');
const expressApp=require('../../libraries/expressApp.js')
const router = express.Router({mergeParams: true})
// const db=require('../../db/db')
const Cookies=require('js-cookie');
const signinCtrl=require('../../controllers/auth/signin');
const jwtLibCtrl = require('../../controllers/libraryControllers/jwtLibCtrl');
const signinLdapCtrl=require('../../controllers/auth/signinLdap');        
const { sign } = require('jsonwebtoken');
const logger=require('../../logger/logger')
const {bcryptHash}=require('../../libraries/bcrypt')
var httpContext = require('express-http-context');


const LOGGER_IDENTITY=" <ROUTE: SIGNIN> "

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

    logger.info(LOGGER_IDENTITY)

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
        logger.warn(LOGGER_IDENTITY+ "despite a valid jwt token, user tried to reauthenticate")
        res.status(500).send("You are already authenticated")
        return;
    }

    //!!! check if tocken is invalid to impemented in middleware



    //### ldap authentication
    if (authPreferred==1 || authSuccess==0){

        logger.info(LOGGER_IDENTITY+ "starting ldap authentication")
        let userPrincipalName= ''
        try {   
            authResult=await signinLdapCtrl.ldapAuthenticate(req.body.auth.username, req.body.auth.password);
        } catch (error) {
            logger.error(LOGGER_IDENTITY + error.message)        
            progressStack.push("Error: ldap authetication")
            res.status(500).send(progressStack)
            return;
        }

        //### if authenticated, cache user in DB 
        if (_.has(authResult,'sAMAccountName')){
            if (authResult.sAMAccountName==req.body.auth.username){
                authSuccess=1;

                userPrincipalName= authResult. userPrincipalName 
                logger.info(LOGGER_IDENTITY + "caching ldap login credentials in db") 

                //### cache ldap user in DB
                let userData={
                    email:      userPrincipalName,
                    full_name:  authResult.displayName,
                    password:   bcryptHash(req.body.auth.password),
                    authentication_type: 'ldap'
                }
                signinLdapCtrl.ldapCacheUserInDb(userData);                
            }        
        }
        else{
            logger.error(LOGGER_IDENTITY+"ldap server not responding") 
            progressStack.push("Error: ldap authetication result recieved.Mismatch found")
        }
    }

    //###local user authentication
    if (authPreferred==2 || authSuccess==0){
        logger.info(LOGGER_IDENTITY+"starting local authentication")
        progressStack.push("Trying: local/cache authetication")
                 
        try { 
            //!!! Method to be defined here
            authResult=await signinCtrl.local.authenticate(req.body.auth.username, req.body.auth.password)
            if (authResult.isAuthenticated){
                authSuccess=2;
            }
            else{
                logger.info(LOGGER_IDENTITY+"authentication failed") 
                progressStack.push("Error: local/cache authetication")    
            }
            
        } catch (error) {     
            logger.error(LOGGER_IDENTITY + error.message) 
            res.status(500).send(progressStack)
            return;
        }     
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
            return;
        }      
    }


    //#### response for ldap authentication
    if (authSuccess==0){
        logger.info(LOGGER_IDENTITY+"all authentication method failed")
        progressStack.push("Error: All athentication method failed");
        res.status(500).send(progressStack); 
        return;
    }
    else if (authSuccess==1){
        logger.info(LOGGER_IDENTITY+"ldap authentication sccessful. logged in as "+req.body.auth.username )
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
    else if (authSuccess==2){
        logger.info(LOGGER_IDENTITY+"local authentication sccessful. logged in as "+req.body.auth.username )

        authResponse={
            loggedIn:   1, //if a valid jwt is generated
            username:   req.body.auth.username,
            fullName:   authResult.user.fullName,
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