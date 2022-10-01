const QB=require('./dbLib/queryBuilder')
const tableMap=require('./dbLib/tables.map')

let process={}

process.getUserPassword=(username)=>{}
process.getUserId=(username)=>{}
process.getUser=(username)=>{} //return user object
process.getGroupMembership=(userId)=>{} //return list of 
process.isAdmin=(userId)=>{} //return boolean

process.updateUserPassword=(currUserName,password)=>{}

process.updateUser=(id,data)=>{
    QB.item.updateById(tableMap["USERS"],id,data)
}

module.exports=process