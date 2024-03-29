//!!! permissions shall not be evaluated for system tables
const tm=require("../../db/dbLib/tables.map").systemTables

const item={}
const cluster={}
const params={}
const system={}

const action={
    CREATE  :   "CREATE",
    READ    :   "READ",
    READ_LIST    :"READ_LIST",
    UPDATE  :   "UPDATE",
    DELETE  :   "DELETE"
}
const LOGGER_IDENTITY=" <DB: QB> "


item.create=function(tableName,data,evalPerm=1){


    let values='';
    let columns='';
    let q='';
    columns=Object.keys(data);
    values=Object.values(data);

    values=values.map((item)=>{
        if (typeof item== 'string'){
            return `\'${item}\' `
        }
        else{
            return item
        }
    })
    q=`INSERT INTO ${tableName} ( ${columns.join(', ')} )
    VALUES ( ${values.join(', ')} );`
    // return q;

    return{
        q:q,
        action: action.CREATE,
        table:tableName
    }
}




item.readById=function(tableName,id){

}


/**
 * Returns query object to read single item.
 *
 * @param {string} tableName The number of table.
 * @param {Array} columns Array of column that you want to read.
 * @param {Object} condition Object of condition i.e key value pairs.

 * @return {Object} query object.
 */
item.readByCondition=function(tableName,columns,condition){
    let q='';
    let pairs='';
    for (var key in condition){
        let value=typeof condition[key] == 'string' ? `\'${condition[key]}\'` : condition[key] ;
        pairs=pairs+' '+key+' = '+value
    }
    
    q=`SELECT ${columns.join(', ')}
    FROM ${tableName}
    WHERE ${pairs}
    LIMIT 1;`

    return{
        q:q,
        action: action.READ,
        table:tableName
    }
}


item.updateById=function(tableName,rowId,data){
    let q='';
    let pairs='';

    for (var key in data){
        let value=typeof data[key] == 'string' ? `\'${data[key]}\'` : data[key] ;
        pairs=pairs+' '+key+' = '+value
    }


    q=`UPDATE  ${tableName}
    SET ${pairs}
    WHERE id= ${rowId} `;

    return{
        q:q,
        action: action.UPDATE,
        table:tableName
    }
    // return q;

//     UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City = 'Frankfurt'
// WHERE CustomerID = 1;
}

item.updateByCondition=function(tableName,conditionObj,data){

}

item.deleteById=function(tableName,id){
    let q=`DELETE FROM ${tableName} WHERE id=${id}`

    return{
        q:q,
        action: action.DELETE,
        table:tableName
    }


    // DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';

}

item.deleteByCondition=function(tableName,conditionObj,data){
    let q='';

    return{
        q:q,
        action: action.DELETE,
        table:tableName
    }

}


cluster.deleteById=function(tableName,ids){//array of ids
    let q=`DELETE FROM ${tableName} WHERE id IN ( ${ids.join(', ')} )`;

    return{
        q:q,
        action: action.DELETE,
        table:tableName
    }
    // return 

    // DELETE from tablename WHERE id IN (1,2,3,...,254);
}

cluster.deleteAllRows=function(tableName){
    let q=`DELETE FROM ${tableName} `;

    return{
        q:q,
        action: action.DELETE,
        table:tableName
    }
    // return 

    // DELETE from tablename WHERE id IN (1,2,3,...,254);
}

/**
 * Returns query object to read single item.
 *
 * @param {Object} pq Object of query parameters.
 * @param {} pq.$select Array of column names e.g. ['id','name']
 * @param {} pq.$from Array of tables e.g. ['views','students']
 * @param {} pq.$filter $filters is string of conditions e.g (a=1 AND b=2) OR (c=1)
 * @param {} pq.$orderBy description
 * @param {Number} isAdmin The number of table.
 * @return {Object} query object.
 */
cluster.readListByParam=function(pq,isAdmin=0){

    
    let q=[]; 
    q.push(`SELECT      ${pq.$select.join(',')}`);
    q.push(`FROM        ${pq.$from.join(',')}`);
    q.push(`WHERE       ${pq.$filter.length==0 ? 1:pq.$filter}`);

    let qsOB=params.queryStringOrderBy(pq.$orderBy)
    if (qsOB){ 
        q.push(`ORDER BY    ${qsOB.join(', ')};`); 
    }

    q=q.join("\n");    

    return{
        q:      q,
        action: action.READ_LIST,
        table:  pq.$from
    }

};


params.queryStringOrderBy=($orderBy)=>{

    if ($orderBy.length==0){
        return 0;
    }

    let sq=$orderBy
    .filter((item)=>{
        return item.order!==0;
    })
    .map((item)=>{
        let order=''        
        if (item.order==1){
            order="ASC"
        }
        else if(item.order==-1){
            order="DESC"
        }
        return ` ${item.colName} ${order} `
    })

    if (sq.length==0){
        return 0;
    }    
    else{
        return sq;
    }
    
}


system.getSystemTableColumns=(listMap)=>{
    let q='';

    q=`SHOW COLUMNS FROM  ${tm[listMap]}`; 

    return{
        q:      q,
        action: action.READ,
        table:  listMap
    }
}

system.getTableColumns=(listName)=>{
    let q='';

    q=`SHOW COLUMNS FROM  ${listName}`; 

    return{
        q:      q,
        action: action.READ,
        table:  listName
    }
}



module.exports.item=item;
module.exports.cluster=cluster;
module.exports.system=system;