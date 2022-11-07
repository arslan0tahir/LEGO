var {pool,execute}=require('../pool')
const dbConfig=require('../../../configs/db')
const systemTables=require('../tables.map').systemTables
const testTables=require('../tables.map').testTables
const QB=require('../queryBuilder')
const bcrypt=require('bcrypt')
const {bcryptHash}=require('../../../libraries/bcrypt')
const dbName=dbConfig.dbName;//### define mapping for system tables, st stands for system table
const poolPromise=pool.promise();

tableData=async function(){
  const myAdminPassword="admin"
  const saltRounds=10
  let data={}

  data["USERS"]=[];
  data["USERS"].push({
    id:1,//1 is reserved for admin
    // createdBy  : null,//null for createdby is only used for admin user 
    // modifiedBy : null,//null for modifiedby is only used for admin user 
    user_name  : 'admin',
    full_name : 'Admin',
    email : "admin@local.com",
    authentication_type  : "local",
    password : bcryptHash("admin"),
  })

  data["USERS"].push({
    id:2,//1 is reserved for admin
    // createdBy  : null,//null for createdby is only used for admin user 
    // modifiedBy : null,//null for modifiedby is only used for admin user 
    user_name  : 'user',
    full_name : 'User',
    email : "user@local.com",
    authentication_type  : "local",
    password : bcrypt.hashSync("user", saltRounds),
  })



  data["GROUPS"]=[];
  data["GROUPS"].push({
    id:1,//1 is reserved for admin
    created_by  : 1,//null for createdby is only used for admin user 
    modified_by : 1,//null for modifiedby is only used for admin user 
    group_name   : 'admins',
    email : "admins@local.com"
  })
  data["GROUPS"].push({
    id:2,//1 is reserved for admin
    created_by  : 1,//null for createdby is only used for admin user 
    modified_by : 1,//null for modifiedby is only used for admin user 
    group_name   : 'users',
    email : "users@local.com"
  })




  data["GROUP_MEMBERSHIP"]=[];
  data["GROUP_MEMBERSHIP"].push({
    id:1,//1 is reserved for admin
    created_by  : 1,//null for createdby is only used for admin user 
    modified_by : 1,//null for modifiedby is only used for admin user 
    group_id   : 1,
    user_id    : 1
  })
  data["GROUP_MEMBERSHIP"].push({
    id:2,//1 is reserved for admin
    created_by  : 1,//null for createdby is only used for admin user 
    modified_by : 1,//null for modifiedby is only used for admin user 
    group_id   : 2,
    user_id    : 2
  })


  data["APP"]=[];
  data["APP"].push({
    id        : 1,
    app_name      : "system"
  })
  data["APP"].push({
    id        : 2,
    app_name      : "university"
  })


  // process.getSystemTableColumns
  data["LIST"]=[];
  data["LIST_VIEWS"]=[];  
  let tableId=1;
  for (const key in systemTables){

    data["LIST"].push({
      id          : tableId,
      app_id      : 1,
      list_system : 1,
      list_name   : systemTables[key], //no spaces allwed, spaes are replaced with undercores
      list_map    : key,
    })

    //??????????????????
  //create  default view for system tables
    res=await execute(QB.system.getSystemTableColumns(key))
    res=res[0];
    console.log(res);

    data["LIST_VIEWS"].push({
      view_name     : key,
      view_tables   : `[${tableId}]`, 
      view_columns  : JSON.stringify(
        res.map((col)=>{
          return {
            list_id: tableId,
            column_name:  col.Field,
            data_type:(function(type){
              if (type.includes('int')){
                return 'text'
              }
              else if (type.includes('char')){
                return 'text'
              }
              else if (type.includes('longtext')){
                return 'cluster'
              }
              else if (type.includes('timestamp')){
                return 'timestamp'
              }

              // 'text', 'textbox', 'dropdown', 'cluster','lookup'
            })(col.Type),
          }
        })
      ), 
      sort_by       : "[]",
      allow_selection : 1,
    })
    tableId++;
  }


  for (const key in testTables){
    data["LIST"].push({
      id          : tableId,
      app_id      : 2,  //2 is a demo app
      list_system : 0,  //0 not a system list
      list_name   : testTables[key], //no spaces allwed, spaes are replaced with undercores
      list_map    : key,
    })

    //??????????????????
  //create  default view for system tables
    res=await execute(QB.system.getTableColumns(key))
    res=res[0];
    console.log(res);

    data["LIST_VIEWS"].push({
      view_name     : key,
      view_tables   : `[${tableId}]`, 
      view_columns  : JSON.stringify(
        res.map((col)=>{
          return {
            list_id: tableId,
            column_name:  col.Field,
            data_type:(function(type){
              if (type.includes('int')){
                return 'text'
              }
              else if (type.includes('char')){
                return 'text'
              }
              else if (type.includes('longtext')){
                return 'cluster'
              }
              else if (type.includes('timestamp')){
                return 'timestamp'
              }

              // 'text', 'textbox', 'dropdown', 'cluster','lookup'
            })(col.Type),
          }
        })
      ), 
      sort_by       : "[]",
      allow_selection : 1,
    })

    tableId++;
  }
  // process.exit();
 

 

 
  await execute(QB.cluster.deleteAllRows(systemTables["APP"]))
  await execute(QB.cluster.deleteAllRows(systemTables["GROUP_MEMBERSHIP"]))
  await execute(QB.cluster.deleteAllRows(systemTables["GROUPS"]))
  await execute(QB.cluster.deleteAllRows(systemTables["USERS"]))
  await execute(QB.cluster.deleteAllRows(systemTables["LIST"]))
  await execute(QB.cluster.deleteAllRows(systemTables["LIST_COLUMN"]))
  await execute(QB.cluster.deleteAllRows(systemTables["LIST_VIEWS"]))

  await execute(QB.cluster.deleteAllRows(testTables["STUDENTS"]))



  
  for(let key in data){
  
    for(let i =0;i<data[key].length; i++){
      let q=QB.item.create(systemTables[key], data[key][i])
      let qd=QB.item.deleteById(systemTables[key], data[key][i].id)
      // try{
      //   res = await poolPromise.query(qd);
      //   console.log(`Query Executed : ${qd}`)
      // }
      // catch(e){ throw e}

      try{
        // console.log("##################"+JSON.stringify(q.q))
        res = await execute(q);
        // console.log(`Query Executed : ${q}`)
      }
      catch(e){
        throw e 
      }   
    }
  }
}
tableData();







