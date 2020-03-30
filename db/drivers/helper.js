var __form2dbDatatypeMapping=require('../staticSchemas/schemas/__form2dbDatatypeMapping')
var __defaults=require('../staticSchemas/schemas/__defaults')
var conn=require('../modules/connection')
/**
 * Extract query string from schema. All foreign key constariants are pushed into queue parameter
 * @param  {Object} schema Table schema object
 * @param  {Array} queue This param hold all foriegn key contraints. Forign key constraints of current schemas are also pushed into this array
 * @return {String} SQL Insert Query String  
 */
schema2QueryString=function(schemaName,includeDefaults, queueFK, queue){
    
    let query='';
    let currColumn=''
    let currColumnName=''
    let path="../staticSchemas/schemas/"+schemaName;
    let schema=require(path);
    //creating default QS from default schema
    let defaultQueryString=getDefaultQueryString(schemaName,1,queue).query

    // query=`CREATE TABLE IF NOT EXISTS ${conn._systemTables[schemaName]}(\n`
    query=defaultQueryString;
    //creating query string from current schema and merging it with default QS 
    for(let i=0;i<schema.length;i++){
        currColumn=''
        currColumn=schema[i].columnName;
        currColumnName=schema[i].columnName;
        currColumn=schema[i].dbDataType=='auto'   ?   currColumn+" "+__form2dbDatatypeMapping[schema[i].formDataType]   :   schema[i].formDataType;
        currColumn=currColumn+" "+schema[i].dbConstraints.join(" ");       

        if ((i+1)!=schema.length){
            currColumn=currColumn+"\n";
        }      

        query=query+currColumn;

        if (schema[i].extraConfigs.foreignKey){
            let fKey=schema[i].extraConfigs.foreignKey;
            queue.push(`ALTER TABLE ${conn._systemTables[schemaName]} ADD CONSTRAINT FOREIGN KEY (${currColumnName}) REFERENCES ${conn._systemTables[fKey.refrences]}(${fKey.refrencedColumn})`)
        }
        //`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (createdBy) REFERENCES ${systemTables["Users"]}(id)
    }

    query=query.split('\n').join(',\n') 
    query=`CREATE TABLE IF NOT EXISTS ${conn._systemTables[schemaName]}(\n${query}\n)ENGINE=INNODB`

    return {
            query:query,
            queue:queue
        }
}


/**
 * Extract query string from schema. All foreign key constariants are pushed into queue parameter
 * @param  {Object} schema Table schema object
 * @param  {Array} queue This param hold all foriegn key contraints. Forign key constraints of current schemas are also pushed into this array
 * @return {String} SQL Insert Query String  
 */
getDefaultQueryString=function(schemaName,queueFK, queue){
    let schema=__defaults

    let query='';
    let currColumn=''
    let currColumnName=''

    for(let i=0;i<schema.length;i++){
        currColumn=''
        currColumn=schema[i].columnName;
        currColumnName=schema[i].columnName;
        currColumn=schema[i].dbDataType=='auto'   ?   currColumn+" "+__form2dbDatatypeMapping[schema[i].formDataType]   :   schema[i].formDataType;
        currColumn=currColumn+" "+schema[i].dbConstraints.join(" ");       


        currColumn=currColumn+"\n";

        query=query+currColumn;


        if (schema[i].extraConfigs.foreignKey){
            //FK Contraint on rowPerm is not applied on permissions table (rowPerm Column is not used)
            if (schemaName=="permissions" && currColumnName=="rowPerm"){
                continue;
            }
            let fKey=schema[i].extraConfigs.foreignKey;
            queue.push(`ALTER TABLE ${conn._systemTables[schemaName]} ADD CONSTRAINT FOREIGN KEY (${currColumnName}) REFERENCES ${conn._systemTables[fKey.refrences]}(${fKey.refrencedColumn})`)
        }
        //`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (createdBy) REFERENCES ${systemTables["Users"]}(id)
    }    
    
   return {
            query:query,
            queue:queue
        }
}

module.exports={schema2QueryString};