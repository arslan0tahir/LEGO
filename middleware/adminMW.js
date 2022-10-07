var httpContext = require('express-http-context');
const _=require('underscore');
const jwtLibCtrl = require('../controllers/libraryControllers/jwtLibCtrl')
const logger=require('../logger/logger')
const db=require('../db/db')


const LOGGER_IDENTITY=" <MW: admin> "

const isAdmin=function (req, res, next){
    const userContext=httpContext.get('userContext')

    if (userContext.isAdmin){
        next();
    }
    else{
        let e=err.ERROR(new Error, 'FORBIDDEN', '', "restricted", LOGGER_IDENTITY);
        throw e
    }

    
}


module.exports=isAdmin;
