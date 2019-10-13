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
 * @return {String} SQL Insert Query String  
 */
let NestedJsonObjectToInsertQueryString=function(obj,index,query){
    // SET AUTOCOMMIT = 0
    // START TRANSACTION;
    //LOOP
    //          INSERT child
    //          Get last insert id
    //          Insert Parent
    //END LOOP
    // COMMIT;

    if (index==0){
        q="";
        index++;

        connection.query("SET AUTOCOMMIT = 0", function (err, result) {
            if (err) throw err;
            console.log(`Deleted All users`);
        })
    }

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
    qDeleteAllRowsFromSystemTables
}