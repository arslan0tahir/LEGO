let uuid=require('uuid/v1');
const bcrypt = require('bcrypt');
let {pool,systemTables,dbName} = require ("./modules/connection")
let helper=require("./modules/helper")
let saltRounds=10;
let myAdminPassword="admin";






//JSON to create Admin Users
let row=[{
  id:'1',
  // createdBy  : '',
  // modifiedBy :  '',
  inheritRowPermissions : '1',
  inheritCellPermissions: '1',
  // rowPerm : '',
  cellPerm : '{}',
  //**end defaults
  userName : "admin",
  email : "arslan.tahir@outlook.com",
  authenticationType  : "local",
  passwordHash : bcrypt.hashSync(myAdminPassword, saltRounds),
  profile : '{}'
}];

//JSON to create root site
let rootSite={
  __ListAlias__:"SiteRegister",
  __ListId__:"",

  id:'1',
  createdBy  : '1',
  modifiedBy :  '1',
  inheritRowPermissions : '0',
  inheritCellPermissions: '0',
  rowPerm : {
    __ListAlias__:"Permissions",
    __ListId__:"",
    id:'1',
    createdBy  : '1',
    modifiedBy :  '1',
    inheritRowPermissions : '0',
    inheritCellPermissions: '0',

  },
  cellPerm : '{}',
  //**end defaults
  siteName: "root",
  parentSite: null
  
  
};


let qDeleteSystemData=helper.qDeleteAllRowsFromSystemTables(systemTables);
let qCreateUsers=helper.jsonArrayToInsertQueryString(row, systemTables["Users"]);


async function main(){
  const promisePool = pool.promise();
  
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













