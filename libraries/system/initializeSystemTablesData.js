var pool=require('../../libraries/db/pool')
const dbConfig=require('../../configs/db')
const systemTables=require('./systemTables').systemTables


const dbName=dbConfig.dbName;//### define mapping for system tables, st stands for system table
const poolPromise=pool.promise();

const myAdminPassword="admin"
const saltRounds=10
let data={}


data["USERS"]=[];
data["USERS"].push({
  id:1,//1 is reserved for admin
  createdBy  : null,//null for createdby is only used for admin user 
  modifiedBy : null,//null for modifiedby is only used for admin user 
  user_name  : 'admin',
  email : "admin@local.com",
  authentication_type  : "local",
  password : bcrypt.hashSync("admin", saltRounds),
})

data["USERS"].push({
  id:2,//1 is reserved for admin
  createdBy  : null,//null for createdby is only used for admin user 
  modifiedBy : null,//null for modifiedby is only used for admin user 
  user_name  : 'user',
  email : "user@local.com",
  authentication_type  : "local",
  password : bcrypt.hashSync("user", saltRounds),
})



data["GROUPS"]=[];
data["GROUPS"].push({
  id:1,//1 is reserved for admin
  createdBy  : 1,//null for createdby is only used for admin user 
  modifiedBy : 1,//null for modifiedby is only used for admin user 
  group_name   : 'admins',
  email : "admins@local.com"
})
data["GROUPS"].push({
  id:2,//1 is reserved for admin
  createdBy  : 1,//null for createdby is only used for admin user 
  modifiedBy : 1,//null for modifiedby is only used for admin user 
  group_name   : 'users',
  email : "admins@local.com"
})




data["GROUP_MEMBERSHIP"]=[];
data["GROUP_MEMBERSHIP"].push({
  id:1,//1 is reserved for admin
  createdBy  : 1,//null for createdby is only used for admin user 
  modifiedBy : 1,//null for modifiedby is only used for admin user 
  group_id   : 1,
  user_id    : 1
})
data["GROUP_MEMBERSHIP"].push({
  id:1,//1 is reserved for admin
  createdBy  : 1,//null for createdby is only used for admin user 
  modifiedBy : 1,//null for modifiedby is only used for admin user 
  group_id   : 2,
  user_id    : 2
})

for(let key in data){
  for(let i =0;i<data[key].length; i++){
    data[key][i]
  }
}






