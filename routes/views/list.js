var httpContext = require('express-http-context');
const _=require('underscore');
const express = require('express');
const expressApp=require('../../libraries/expressApp.js');
const router = express.Router({mergeParams: true})


const logger=require('../../logger/logger');
const err=require('../../errors/errors');
const db = require('../../db/db.js');
const tm=require('../../db/dbLib/tables.map').systemTables


const LOGGER_IDENTITY=" <ROUTE: GET_VIEW> ";

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

    let viewName=req.params.viewName;
    let viewTable=tm["LIST_VIEWS"];
    let viewCondition={};
    let view={};
    let row=[];


    //### loading view data from view list/table
    viewCondition["view_name"]=viewName;
    row=await db.process.getItemByParams(viewTable, ["*"] , viewCondition);   
    view=row[0];

    //### converting json strings to JSON object
    view["view_columns"]=JSON.parse(view["view_columns"])
    view["view_tables"]=JSON.parse(view["view_tables"])
    view["sort_by"]=JSON.parse(view["sort_by"])

    //### expanding lists associated with the view
    let pq={};
    let f='';
    let viewTables=view["view_tables"];
    let expandedTables=[];

    pq.$select=["*"];
    pq.$from=[tm["LIST"]];
    pq.$orderBy=[];        
    viewTables=viewTables.map((id)=>{
        return `id = ${id}`; 
    })
    pq.$filter=viewTables.join(" OR ");

    expandedTables=await db.process.getListByParams(pq);       
    view["view_tables_expanded"]=expandedTables;


    //### if column registered in view belongs to system table then append virtual id as per index of column (requirement of react)
    let viewColumns=view["view_columns"];
    let vId=1;
    let prevViewColId=0;
    let currViewColId=0;

    view["view_columns"]=viewColumns.map((col,i)=>{     
        //## check if list column belongs to system table
        let isSystemList=expandedTables.find((list)=>{
            if (list.id==col.list_id){
                return list;
            }
        })
        if (isSystemList){
            col.id=vId;
            vId++;
            return col;
        }
        

    })
    



    res.send(view);
    return next();

    let expression=req.params.expression;
    // let systemTable=tm[req.params.tableName];

    
    let $expansionTable="";
    let $expansionColumn="";
    let $expandAll=req.query.$expandAll;





    let key=expression.split("(")[0];
    let value=expression.match(/\(([^)]+)\)/)[1];
    // let condition={};
    
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
    //let row=await db.process.getItemByParams(systemTable, ["*"] , condition);    

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