/**
 * Helper Module
 * @module modules/helper 
 */


let {pool,systemTables}=require("./connection");


/**
 * Return query to delete all rows from database
 * @param  {Object} obj Object holding the name system tables whose rows are to be deleted
 * @return {String} SQL query string  
 */ 
let qDeleteAllRowsFromSystemTables=function(obj){
    // SET FOREIGN_KEY_CHECKS = 0;\n
    // query+`TRUNCATE TABLE ${systemTables[key]}; \n`
    // query=query+"SET FOREIGN_KEY_CHECKS = 1;\n";
    
    let query="";
    for (key in systemTables){
        query=query+`DELETE FROM ${systemTables[key]};
            ALTER TABLE  ${systemTables[key]} AUTO_INCREMENT = 1;\n`;
    }
    // console.log(query)
    return query;    
}






/**
 * Convert JSON into SQL Insert Query String
 * @param  {Array} arr Array of JSON Objects with table column names as keys and values as values
 * @param  {String} tableName Table Name in follwoing format [DataBase].[Table]
 * @return {String} SQL Insert Query String  
 */
let jsonArrayToInsertQueryString=function(arr,tableName){
    let q='';
    let obj={};
    for(var i=0;i<arr.length;i++){
        obj=arr[i];
        q=`${q} INSERT INTO ${tableName} ` 
        let col=`(`;
        let val=`(`;
      
        //first key of obj
        let fKey=1;
        for (key in obj){
          //if current key is not first key
          if (fKey==0){
            col=col+" , ";
            val=val+" , "
          }
      
          col=col+"`"+key+"`"
          val=val+"'"+obj[key]+"'"    
      
          fKey=0;
        }
        col=col+`)`;
        val=val+`)`;
      
      
        q=q+col+"\n"+"VALUES "+val+";\n"
    }    
    

  
    return q  
}


/**
 * Convert Nested JSON Array into SQL Insert Query String
 * @param  {Object} obj Nested JSON Object with table column names as keys and values as values
 * @param  {String} tableName Table Name in follwoing format [DataBase].[Table]
 * @return {Array} Array of queries with child first approach  
 */
async function nestedJsonObjectTotDb(obj,currObj,index){
    index=0;
    let dummyAwait=[56,98,75]
    let k=0;
    const promisePool = pool.promise();
    const connection = await promisePool.getConnection();
    currObj=obj;
    async function aliasNestedJsonObjectToInsertDb(obj,currObj,index){
        //start of recursion
        let myObj=JSON.parse(JSON.stringify(currObj));
        let insertId;
        if(Object.keys(myObj).length === 0){
            return 0;
        }
        if (index==0){
                       
            await connection.beginTransaction();
        }
        index++;
        //go one step down in the object (if possible)
        let childObj={};
        let skip=1;
        let holdChildIds=[];
        for(key in myObj){
            if(typeof myObj[key] === 'object' && myObj[key].constructor === Object){
                childObj=JSON.parse(JSON.stringify(myObj[key]));
                //await is used to return a value instead of promise
                skip=0;
                //if child found
                insertId=await aliasNestedJsonObjectToInsertDb(obj,childObj,index)
                holdChildIds.push(insertId);
            }            
        }
        if (skip){//if no child found
            insertId=await aliasNestedJsonObjectToInsertDb(obj,childObj,index)
        }


            //[START] Preparing myObj for Db Insertion

        let fk=[32,33,34,35]
            //listname and table name are used for same purpose
        let listAlias=myObj["__ListAlias__"];
        delete myObj["__ListAlias__"];

        let listId=myObj["__ListId__"];
        delete myObj["__ListId__"];

        //replacing child objects with insert ids i.e foriegn keys
        let i=0;
        for(key in myObj){
            if(typeof myObj[key] === 'object' && myObj[key].constructor === Object){
                myObj[key]=fk[i]
                i++;
            }
        }
        //[END] Preparing myObj for Db Insertion
        console.log("index ",insertId, myObj)

        //await connection.query(jsonArrayToInsertQueryString([myObj],listAlias));


        //Insert to DB with Insert Id
        //get and return new insert ID
        //
        k++
        return dummyAwait[k];



    }
    await aliasNestedJsonObjectToInsertDb(obj,currObj,index);   

        let q='';
    // let obj={};
    // obj=arr[i];
    // q=`${q} INSERT INTO ${tableName} ` 
    // let col=`(`;
    // let val=`(`;
  
    // //first key of obj
    // let fKey=1;
    // for (key in obj){
    //   //if current key is not first key
    //   if (fKey==0){
    //     col=col+" , ";
    //     val=val+" , "
    //   }
  
    //   col=col+"`"+key+"`"
    //   val=val+"'"+obj[key]+"'"    
  
    //   fKey=0;
    // }
    // col=col+`)`;
    // val=val+`)`;
  
  
    // q=q+col+"\n"+"VALUES "+val+";\n"  
    

  
    // return q  


    

}


module.exports={
    jsonArrayToInsertQueryString,
    qDeleteAllRowsFromSystemTables,
    nestedJsonObjectTotDb
}