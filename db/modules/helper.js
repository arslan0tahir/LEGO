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
    

    let query="SET FOREIGN_KEY_CHECKS = 0;\n";
    for (key in systemTables){
        query=query+`TRUNCATE TABLE ${systemTables[key]}; \n`
            
    }
    query=query+`SET FOREIGN_KEY_CHECKS = 1;`
    return query;    


    // let query="";
    // for (key in systemTables){
    //     query=query+`DELETE FROM ${systemTables[key]};
    //         ALTER TABLE  ${systemTables[key]} AUTO_INCREMENT = 1;\n`;
    // }
    // return query;    
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

          if (obj[key]){
            val=val+"'"+obj[key]+"'"             
          }
          else{
            val=val+"NULL" 
          }
      
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
 * @param  {Object} currObj Current Node (it can be any decendent currently being trnslated to db in recurssion stack)
 * @param  {Number} index Increment against every object that is translated to db 
 * @return {} void  
 */
async function nestedJsonObjectTotDb(obj,currObj,index){
    index=0;

    //getting connection for transaction
    const promisePool = pool.promise();
    const connection = await promisePool.getConnection();
    
    currObj=obj;
    await connection.beginTransaction();

            //this alias function was for testing purpose and may be unified in future versions
    async function aliasNestedJsonObjectToInsertDb(obj,currObj,index,connection){
        //start of recursion

        //copying currObj by value
        let myObj=JSON.parse(JSON.stringify(currObj));
        let insertId;

        //for JSON object with no child node return 0 and process and translate the stacked nodes to db 
        if(Object.keys(myObj).length === 0){
            return 0;
        }

        //start transaction on start. It will be called once throughout the recurssions 
        if (index==0){                       
        }
        index++;

        //go one step down in the object (if possible)
        let childObj={};
        let noChild=1;
        //fk hold insert ids (foriegn keys) of all sibling nodes and are used as forignkeys for parent node
        let fk=[];
        for(key in myObj){
            //if child found, stack the child and try to go one more step down
            if(typeof myObj[key] === 'object' && ((myObj[key]||'').constructor) === Object){
                childObj=JSON.parse(JSON.stringify(myObj[key]));
                //await is used to return a value instead of promise
                noChild=0;
                //if child found
                insertId=await aliasNestedJsonObjectToInsertDb(obj,childObj,index,connection)
                fk.push(insertId);
            }            
        }
        if (noChild){//if no child found
            insertId=await aliasNestedJsonObjectToInsertDb(obj,childObj,index,connection)
        }


        //[START] Preparing myObj for Db Insertion
        //listname and table name are used for same purpose
        let listAlias=myObj["__ListAlias__"];
        delete myObj["__ListAlias__"];

        let listId=myObj["__ListId__"];
        delete myObj["__ListId__"];

        //replacing child objects with insert ids i.e foriegn keys
        let i=0;
        for(key in myObj){
            //if object is not empty
            if(typeof myObj[key] === 'object' && (myObj[key]||'').constructor === Object){
                myObj[key]=fk[i]
                i++;
            }
        }
        //[END] Preparing myObj for Db Insertion
        
        //translating reverse chronologically isolated JSON node to mysql query(i.e. botton to top)
        let qq=jsonArrayToInsertQueryString([myObj],systemTables[listAlias]);
        console.log(qq);
        try{
            [row,fields]=await connection.query(qq);
            console.log(` index: ${index} \n InsertedIn: ${systemTables[listAlias]} \n InsertId: ${row.insertId}
            `)   
        }
        catch(err){
            await connection.rollback();
            throw err;
        }
        finally{
            await connection.release();
        }

       


        //return last insert id (to be used as fk in parent node)
        return row.insertId;
    }
    
    await aliasNestedJsonObjectToInsertDb(obj,currObj,index,connection);   
    await connection.commit();
        
    
 

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