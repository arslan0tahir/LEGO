//!!! permissions shall not be evaluated for system tables
const item={}
const cluster={}
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
        action: 'CREATE',
        table:tableName
    }
}




item.readById=function(tableName,id){

}

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
        action: 'READ',
        table:tableName
    }
    // return q;
//     SELECT * FROM Customers
// WHERE Country='Germany'
// LIMIT 3;
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
        action: 'UPDATE',
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
        action: 'DELETE',
        table:tableName
    }


    // DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';

}

item.deleteByCondition=function(tableName,conditionObj,data){
    let q='';

    return{
        q:q,
        action: 'DELETE',
        table:tableName
    }

}


cluster.deleteById=function(tableName,ids){//array of ids
    let q=`DELETE FROM ${tableName} WHERE id IN ( ${ids.join(', ')} )`;

    return{
        q:q,
        action: 'DELETE',
        table:tableName
    }
    // return 

    // DELETE from tablename WHERE id IN (1,2,3,...,254);
}

module.exports.item=item;
module.exports.cluster=cluster;