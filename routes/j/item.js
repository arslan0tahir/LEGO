var httpContext = require('express-http-context');
const _=require('underscore');
const express = require('express');
const expressApp=require('../../libraries/expressApp.js');
const router = express.Router({mergeParams: true})


const logger=require('../../logger/logger');
const err=require('../../errors/errors');
const db = require('../../db/db.js');



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


router.get('/',async function (req, res, next) {
    res.send(`PARAMS ${req.params.tableName} ${req.params.id}`);

    let pq={};

    next();
})

module.exports = router