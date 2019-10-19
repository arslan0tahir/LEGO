let uuid=require('uuid/v1');
const bcrypt = require('bcrypt');
let {pool,systemTables,dbName} = require ("./modules/connection")
let helper=require("./modules/helper")
let saltRounds=10;
let myAdminPassword="admin";






//JSON to create Admin Users
let row=[{
  id:'1',//1 is reserved for admin
  createdBy  : null,//null for createdby is only used for admin user 
  modifiedBy : null,//null for modifiedby is only used for admin user 
  inheritRowPermissions : '1',
  inheritCellPermissions: '1',
  rowPerm : null,
  cellPerm : null,
  //**end defaults
  userName : "admin",
  email : "arslan.tahir@outlook.com",
  authenticationType  : "local",
  passwordHash : bcrypt.hashSync(myAdminPassword, saltRounds),
  profile : '{}'
}];

//Create Admin Group
let groups=[{
  id:'1',
  createdBy  : '1',
  modifiedBy :  '1',
  inheritRowPermissions : '1',//as inheritance is enabled so no unique permissions required
  inheritCellPermissions: '1',
  rowPerm : null,//no unoque permissions
  cellPerm : null,//no unique permissions
  //**end defaults
  groupName : "admins",
  email : "arslan.tahir@outlook.com",
  profile : '{}'
}];

//Create Group Membership
let groupsMemberShip=[{
  id:'1',
  createdBy  : '1',
  modifiedBy :  '1',
  inheritRowPermissions : '1',//as inheritance is enabled so no unique permissions required
  inheritCellPermissions: '1',
  rowPerm : null,//no unoque permissions
  cellPerm : null,//no unique permissions
  //**end defaults
  groupId : '1',
  userId : '1'
}];


//JSON to create root site
let rootSite={
  __ListAlias__:"SiteRegister",
  __ListId__:"",

  id:'1',
  createdBy  : '1',
  modifiedBy :  '1',
  inheritRowPermissions : '0',
  inheritCellPermissions: '1',
  rowPerm : {
    __ListAlias__:"Permissions",
    __ListId__:"",
    id:'1',
    createdBy  : '1',
    modifiedBy :  '1',
    fullControl: `{ "u":[1], "g":[1] }`,
    createItem :`{ "u":[1], "g":[1] }`,
    readItem :`{ "u":[1], "g":[1] }`,
    updateItem: `{ "u":[1], "g":[1] }`,
    deleteItem :`{ "u":[1], "g":[1] }`,
    chnagePermissions:`{ "u":[1], "g":[1] }`    
  },
  cellPerm : null,
  //**end defaults
  siteName: "root",
  parentSite: null
  
  
};

//JSON to create first list
let myFIrstList={
  __ListAlias__:"SiteListRegister",
  __ListId__:"",

  id:'1',
  createdBy  : '1',
  modifiedBy :  '1',
  inheritRowPermissions : '1',
  inheritCellPermissions: '1',
  cellPerm : null,
  //**end defaults
  listName: "Complaints",
  parentSite:"1",
  SiteListColumnRegister: [

            {columnName : "Title",
            DataType : "textbox",
            rowPerm : {
                __ListAlias__:"Permissions",
                __ListId__:"",
                id:'100',
                createdBy  : '1',
                modifiedBy :  '1',
                fullControl: `{ }`,
                createItem :`{ "u":[1], "g":[1] }`,
                readItem :`{ }`,
                updateItem: `{ "u":[1], "g":[1] }`,
                deleteItem :`{  }`,
                chnagePermissions:`{ "u":[1], "g":[1] }`    
              }
            }, 

            {columnName : "Compaint Type",
            DataType : "dropdown",
            rowPerm : {
                __ListAlias__:"Permissions",
                __ListId__:"",
                id:'101',
                createdBy  : '1',
                modifiedBy :  '1',
                fullControl: `{ }`,
                createItem :`{ }`,
                readItem :`{ }`,
                updateItem: `{  }`,
                deleteItem :`{  }`,
                chnagePermissions:`{ "u":[1], "g":[1] }`    
              }
            }
        ]
  
  
};

let qDeleteSystemData=helper.qDeleteAllRowsFromSystemTables(systemTables);
let qCreateUsers=helper.jsonArrayToInsertQueryString(row, systemTables["Users"]);
let qCreateGroups=helper.jsonArrayToInsertQueryString(groups, systemTables["Groups"]);
let qGroupMembership=helper.jsonArrayToInsertQueryString(groupsMemberShip, systemTables["GroupMembership"]);
// let qList=helper.jsonArrayToInsertQueryString(myFIrstList, systemTables["SiteListColumnRegister"]);



async function main(){
  const promisePool = pool.promise();
 
  
/*  
  //deleting data from system tables
  [row,fields]=await promisePool.query(qDeleteSystemData)
  console.log("Data from systems table deleted");

  //creating users
  [row,fields]=await promisePool.query(qCreateUsers)
  console.log("Default Users Created");

  //creating root site
  console.log("Creating Root Site");
  await helper.nestedJsonObjectTotDb(rootSite,rootSite,0)
  console.log("Root Site Created");

  //creating groups
  [row,fields]=await promisePool.query(qCreateGroups)
  console.log("Default Groups Created");

  //creating group membership
  [row,fields]=await promisePool.query(qGroupMembership)
  console.log("Default GroupMembership Created");
*/
    //creating first list
    await helper.nestedJsonObjectTotDb(myFIrstList,myFIrstList,0)
    console.log("First Site list created Created");
  
  
}

// setInterval(()=>{
//   let {pool}=require ("./modules/connection");
//   console.log(pool._allConnections.length,pool._allConnections.length)
//   console.log(`
//     ${pool.config.connectionLimit}          // passed in max size of the pool
//     ${pool._freeConnections.length}         // number of free connections awaiting use
//     ${pool._allConnections.length}          // number of connections currently created, including ones in use

//   `)
// },10000)

main();
console.log("hello")



// connection.query(helper.jsonArrayToInsertQueryString(row, systemTables["Users"]), function (err, result) {
//   if (err) throw err;
//   console.log(`Users Created`); 
// })






//create Root Site

// console.log(systemTables)

//connection shall only be terminated if no other instance is using this connection.













