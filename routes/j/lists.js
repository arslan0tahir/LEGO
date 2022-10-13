var httpContext = require('express-http-context');
const _=require('underscore');
const express = require('express');
const expressApp=require('../../libraries/expressApp.js');
const router = express.Router({mergeParams: true})
const Cookies=require('js-cookie');
const signinCtrl=require('../../controllers/auth/signin');
const jwtLibCtrl = require('../../controllers/libraryControllers/jwtLibCtrl');
const {sign} = require('jsonwebtoken');
const logger=require('../../logger/logger');
const {bcryptHash}=require('../../libraries/bcrypt');
const ldapConfig=require('../../configs/ldap');
const err=require('../../errors/errors');



const LOGGER_IDENTITY=" <ROUTE: SIGNIN> ";

//### all db operation shal be performed through controller

app=expressApp.app;
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


router.post('/',async function (req, res, next) {
    next();
})


router.get('/', function (req, res, next) {
    let q={};
    q.$select=req.query.$select;
    q.$from=req.query.$from;
    q.$filter=req.query.$filter;
    q.$orderBy=req.query.$orderBy;
    q.$limit=req.query.$limit;
    


    res.send(q);
    next();
})

module.exports = router