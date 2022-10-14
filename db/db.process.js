const QB=require('./dbLib/queryBuilder')
const tableMap=require('./dbLib/tables.map').systemTables
const {pool,execute}=require('./dbLib/pool')
const _=require('underscore')
const ldapConfig=require('../configs/ldap')

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
    let q=QB.item.readByCondition(tableMap["USERS"],['id'],{user_name:username})
    const [rows, fields]=await execute(q);
    return ( ( ( rows||[] )[0] || {} ).id || 0 ) ;
}

process.getUserIdByEmail=async (email)=>{
    let q=QB.item.readByCondition(tableMap["USERS"],['id'],{email:email})
    const [rows, fields]=await execute(q);
      
    return ( ( ( rows||[] )[0] || {} ).id || 0 ) ;
}

process.getUserIdByUsernameGeneric=async (username)=>{

    let userId=0;
    userId=await process.getUserIdByEmail(`${username}@${ldapConfig.ldapDomain}`);
    if (!userId){
        //for local user 
        userId=await process.getUserIdByUsername(username);   
    }
    else {
        //for any other authentication method
    }

    return userId;
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


process.getUserGroups=async (userId)=>{
    let Query={};


    Query.q=`SELECT   ${tm["GROUPS"]}.id AS group_id , ${tm["GROUPS"]}.group_name
            FROM    ${tm["GROUPS"]} , ${tm["USERS"]} , ${tm["GROUP_MEMBERSHIP"]}
            WHERE   ${tm["GROUP_MEMBERSHIP"]}.user_id = ${tm["USERS"]}.id 
                AND ${tm["GROUP_MEMBERSHIP"]}.group_id = ${tm["GROUPS"]}.id
                AND ${tm["USERS"]}.id = ${userId}; ` 
    

    
    const [rows, fields]=await execute(Query);
    return rows;

} //return list of 
process.isAdmin=async (userId)=>{

    const userGroups=await process.getUserGroups(userId);    
    for(const group of userGroups){
        if (group.group_name=="admins"){
            return 1;
        }
    }

    return 0;    
} //return boolean

process.updateUserPassword=(currUserName,password)=>{}


process.updateUser=async (id,data)=>{
    let q=QB.item.updateById(tableMap["USERS"],id,data)
    const [rows, fields]=await execute(q);
    if(rows.affectedRows==1){
        return 1;
    }
}

process.getListByParams=async (pq)=>{
    let q=QB.cluster.readListByParam(pq);
    const [rows, fields]=await execute(q);
    return rows;
}

module.exports=process