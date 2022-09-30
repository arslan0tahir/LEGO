
qCreateItem=function(tableName,obj,evalPerm=1){

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




qReadItemById=function(tableName,id){

}

qReadItemByCondition=function(tableName,conditionObj){

}

qUpdateItemById=function(tableName,id,data){

}

qUpdateItemByCondition=function(tableName,conditionObj,data){

}

qDeleteItemById=function(tableName,id,data){

}

qDeleteItemByCondition=function(tableName,conditionObj,data){

}


module.exports.qCreateItem=qCreateItem;