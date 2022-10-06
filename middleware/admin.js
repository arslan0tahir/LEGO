var httpContext = require('express-http-context');
const _=require('underscore');
const jwtLibCtrl = require('../controllers/libraryControllers/jwtLibCtrl')
const logger=require('../logger/logger')
const db=require('../db/db')


const LOGGER_IDENTITY=" <MW: SIGNIN> "

const isAdmin=function (req, res, next){
    const userContext=httpContext.get('userContext')

    if (userContext.isAdmin){
        next();
    }

    
}


module.exports=isAdmin;
