const QB=require('./dbLib/queryBuilder')
const tableMap=require('./dbLib/tables.map')
const {pool,execute}=require('./dbLib/pool')

let process={}
process.createUser=async (data)=>{
    q=QB.item.create(tableMap["USERS"],data)
    await execute(q);
}


process.getUserPassword=(username)=>{}

process.getUserId=async (username)=>{
    let q=QB.item.readByCondition(tableMap["USERS"],['id'],{username:username})
    await execute(q);

}
process.getUser=(username)=>{} //return user object
process.getGroupMembership=(userId)=>{} //return list of 
process.isAdmin=(userId)=>{} //return boolean

process.updateUserPassword=(currUserName,password)=>{}


process.updateUser=async (id,data)=>{
    q=QB.item.updateById(tableMap["USERS"],id,data)
    await execute(q);
}

module.exports=process