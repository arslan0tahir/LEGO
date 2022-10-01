
const item={}
const cluster={}

item.create=function(tableName,obj,evalPerm=1){

    let q=`INSERT INTO ${tableName}`;
    let values='';
    let columns='';

    columns=Object.keys(obj);
    values=Object.values(obj);

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
    return q;
}




item.readById=function(tableName,id){

}

item.readByCondition=function(tableName,conditionObj){

}

item.updateById=function(tableName,rowId,data){
    let q='';
    let pairs='';

    for (var key in data){
        let value=typeof data[key] == 'string' ? `\'${data[key]}\'` : data[key] ;
        pair=pair+' '+key+' = '+value
    }


    q=`UPDATE  ${tableName}
    SET ${pairs}
    WHERE id= ${rowId} `;
    return q;

//     UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City = 'Frankfurt'
// WHERE CustomerID = 1;
}

item.updateByCondition=function(tableName,conditionObj,data){

}

item.deleteById=function(tableName,id){
    return `DELETE FROM ${tableName} WHERE id=${id}`
    // DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';

}

item.deleteByCondition=function(tableName,conditionObj,data){

}


cluster.deleteById=function(tableName,ids){//array of ids
    return `DELETE FROM ${tableName} WHERE id IN ( ${ids.join(', ')} )`

    // DELETE from tablename WHERE id IN (1,2,3,...,254);
}

module.exports.item=item;
module.exports.cluster=cluster;