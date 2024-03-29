var httpContext = require('express-http-context');
const _=require('underscore');
const express = require('express');
const expressApp=require('../../libraries/expressApp.js');
const router = express.Router({mergeParams: true})


const logger=require('../../logger/logger');
const err=require('../../errors/errors');
const db = require('../../db/db.js');
const tm=require('../../db/dbLib/tables.map').systemTables


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

//### e.g. /_api/j/item/LIST_VIEWS/view_name('STUDENTS')?$expand=LIST\view_tables   
//$exapand single item or $expandAll for array
//### list id can be an id or array of ids, if array of ids is recieved then instead of inline query seperate query is executed 
router.get('/',async function (req, res, next) {
    let expression=req.params.expression;
    let systemTable=tm[req.params.tableName];

    
    let $expansionTable="";
    let $expansionColumn="";
    let $expandAll=req.query.$expandAll;





    let key=expression.split("(")[0];
    let value=expression.match(/\(([^)]+)\)/)[1];
    let condition={};
    
    if (value.startsWith("'") && value.endsWith("'")) {
        value=value.split("'")[1];
    }
    else if ( value.startsWith('"') && value.endsWith('"')){
        value=value.split('"')[1];
    }
    else{
        value=Number(value);
    }


    condition[key]=value;
    let row=await db.process.getItemByParams(systemTable, ["*"] , condition);    

    row=row[0];


    if ($expandAll){    
        $expandAll=req.query.$expandAll.split('\\');    
        $expansionTable=$expandAll[0];
        $expansionColumn=$expandAll[1];
        
        let expansionIdArr=JSON.parse(row[$expansionColumn])
        let expansionResultArr=[]
        for(value of expansionIdArr){
            let condition={};

            condition["id"]=value;
            let expRow=await db.process.getItemByParams(tm[$expansionTable], ["*"] , condition); 
            expansionResultArr.push(expRow[0]);
        }
        row[$expansionColumn]=JSON.stringify(expansionResultArr);
    }
    



    res.send(row)

    // res.send(`PARAMS ${req.params.tableName} ${req.params.expression}`);
    next();
})

module.exports = router