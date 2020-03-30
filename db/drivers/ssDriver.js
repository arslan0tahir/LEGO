var __defaults=require('../staticSchemas/schemas/__defaults')
var __form2dbDatatypeMapping=require('../staticSchemas/schemas/__form2dbDatatypeMapping')
fs = require('fs');
var helper=require('./helper')


//drive using static schemas

resetDb=function(){
    //delete all previosly created system tables
    //recreate all system table using static schemas
    let queue=[];

    let users=helper.schema2QueryString('users',1,1,queue)
    let groups=helper.schema2QueryString('groups',1,1,queue)
    let groupMembership=helper.schema2QueryString('groupMembership',1,1,queue)
    let permissions=helper.schema2QueryString('permissions',1,1,queue)
    let siteRegister=helper.schema2QueryString('siteRegister',1,1,queue)
    let siteListRegister=helper.schema2QueryString('siteListRegister',1,1,queue)
    let siteListColumnRegister=helper.schema2QueryString('siteListColumnRegister',1,1,queue)
    
    let fq=users.query+"\n\n"+
        groups.query+"\n\n"+
        groupMembership.query+"\n\n"+
        permissions.query+"\n\n"+
        siteRegister.query+"\n\n"+
        siteListRegister.query+"\n\n"+
        siteListColumnRegister.query+"\n\n\n\n"+
        queue.join('\n');



    fs.writeFile('logs/resetDB/attempt/last.txt', fq, function (err) {
        if (err) return console.log(err);
        console.log('resetDB attempt logged successfully');
    });

    console.log(fq)
    

    
    


    // id BIGINT AUTO_INCREMENT PRIMARY KEY,
    // uuid VARCHAR(36),
    // created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    // modified TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    // createdBy bigint,
    // modifiedBy  bigint,

    // inheritRowPermissions TINYINT(1),
    // inheritCellPermissions TINYINT(1),
    // rowPerm BIGINT,
    // cellPerm JSON,`


}

validate=function(object){//obj
    //server side validation of object as defined in schema file
}

createItem=function(object){
    //note: this functions are only based upon evaluated permissions
    
    //server side validate VS embeding serverside validation in helper
    //insert into Db using helper modules
}

updateItem=function(){}
deleteItem=function(){}
readItem=function(){}
readItems=function(){}


module.exports={resetDb};

