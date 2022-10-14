var httpContext = require('express-http-context');
const _=require('underscore');
const express = require('express');
const expressApp=require('../../libraries/expressApp.js');
const router = express.Router({mergeParams: true})

const listsCtrl = require('../../controllers/j/lists');
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
    let pq={};
    pq.$select=JSON.parse(req.query.$select);
    pq.$from=JSON.parse(req.query.$from);
    pq.$filter=JSON.parse(req.query.$filter);
    pq.$orderBy=JSON.parse(req.query.$orderBy);
    pq.$limit=JSON.parse(req.query.$limit);

    rows=await db.process.getListByParams(pq);    
    res.send(rows);
    next();
})

module.exports = router