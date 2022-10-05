const QB=require('./dbLib/queryBuilder')
const tableMap=require('./dbLib/tables.map').systemTables
const {pool,execute}=require('./dbLib/pool')
const _=require('underscore')

let process={}
let tm=tableMap;
process.createUser=async (data)=>{
    let q='';
    q=QB.item.create(tableMap["USERS"],data);
    const [rows, fields]=await execute(q);

    return rows.insertId || 0;
}


process.getUserPassword=(username)=>{}

process.getUserIdByUsername=async (username)=>{
    let q=QB.item.readByCondition(tableMap["USERS"],['id'],{username:username})
    const [rows, fields]=await execute(q);
    return ( ( ( rows||[] )[0] || {} ).id || 0 ) ;
}

process.getUserIdByEmail=async (email)=>{
    let q=QB.item.readByCondition(tableMap["USERS"],['id'],{email:email})
    const [rows, fields]=await execute(q);
      
    return ( ( ( rows||[] )[0] || {} ).id || 0 ) ;
}

process.getUser=async (username)=>{
    let q=QB.item.readByCondition(tableMap["USERS"],['user_name','email','full_name','password'],{user_name : username})
    const [rows, fields]=await execute(q);
    return ( rows||[] )[0] || 0;
    
} //return user object

process.getUserByEmail=async (email)=>{
    let q=QB.item.readByCondition(tableMap["USERS"],['user_name','email','full_name','password'],{email : email})
    const [rows, fields]=await execute(q);
    return ( rows||[] )[0] || 0;    
}

process.getGroups=async (userId)=>{
    let q=QB.item.readByCondition(tableMap["USERS"],['user_name','email','full_name','password'],{email : email})
    const [rows, fields]=await execute(q);
    return ( rows||[] )[0] || 0;    
}


process.memberOf=(userId)=>{

    let q=`SELECT   ${tm["GROUPS"]}.id AS group_id , ${tm["GROUPS"]}.group_name
            FROM    ${tm["GROUPS"]} , ${tm["USERS"]} , ${tm["GROUP_MEMBERSHIP"]}
            WHERE   ${tm["GROUP_MEMBERSHIP"]}.user_id = ${tm["USERS"]}.id 
                AND ${tm["GROUP_MEMBERSHIP"]}.group_id = ${tm["GROUPS"]}.id
                AND ${tm["USERS"]}.id = ${userId}; ` 

} //return list of 
process.isAdmin=(userId)=>{
    
} //return boolean

process.updateUserPassword=(currUserName,password)=>{}


process.updateUser=async (id,data)=>{
    let q=QB.item.updateById(tableMap["USERS"],id,data)
    const [rows, fields]=await execute(q);
    if(rows.affectedRows==1){
        return 1;
    }
}

module.exports=process