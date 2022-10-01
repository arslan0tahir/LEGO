var mysql = require('mysql');
var {pool,execute}=require('../pool');
const dbConfig=require('../../../configs/db')
const systemTables=require('../tables.map').systemTables
//[START initialize info for bcrypt]
const saltRounds = 10;
const myAdminPassword = 'admin';


const dbName=dbConfig.dbName;
const poolPromise=pool.promise();

let constriants=[];


const defaultColumns=`
    id                BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid              VARCHAR(36),

    created           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified          TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by         BIGINT,
    modified_by        BIGINT,`
//cell permissions

const defaultConstraints=function(tableName,qty){
      
      if(qty=="all"){
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (created_by) REFERENCES ${systemTables["USERS"]}(id)`)
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (modified_by) REFERENCES ${systemTables["USERS"]}(id)`)
      }
      else {
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (created_by) REFERENCES ${systemTables["USERS"]}(id)`)
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (modified_by) REFERENCES ${systemTables["USERS"]}(id)`)
       
      }
}
 


// pool.query("SELECT * FROM TABLE_NAME",(err, data) => {
//   //     if(err) {
//   //         console.error(err);
//   //         return;
//   //     }
//   //     // rows fetch
//   //     console.log(data);
//   // });


  
  
  /*Delete already existed database named "legos":*/
  pool.query(`DROP DATABASE  IF EXISTS ${dbName}`, (err, rows, fields)=> {
    if (err) throw err;
    console.log("Database deleted");
      //### create a database named "legos":
    pool.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, async (err, result)=> {
        if (err) throw err;
        console.log("Database created");


        //### create USERS table:*/
        let query=`
        CREATE TABLE IF NOT EXISTS ${systemTables["USERS"]} (
        ${defaultColumns}  
        user_name  VARCHAR(255),
        email VARCHAR(255),
        authentication_type VARCHAR(255),
        password VARCHAR (255),
        profile BIGINT,

        UNIQUE UsersUniqueKey (user_name,email) )ENGINE=INNODB`;
        defaultConstraints("USERS","all"); 
        try{
          res = await poolPromise.query(query);
          console.log(`Table created : ${systemTables["USERS"]}`)
        }
        catch(e){
          throw e 
        }       
        // if (err) { throw err; } else { console.log(`Table created : ${systemTables["USERS"]}`) };

        



        //### create Groups table
        query=`CREATE TABLE IF NOT EXISTS ${systemTables["GROUPS"]}(
          ${defaultColumns}  
          group_name VARCHAR(255),
          email VARCHAR(255),
          UNIQUE GroupsUniqueKey (group_name, email) )ENGINE=INNODB`;
        defaultConstraints("GROUPS","all")
        try{
          res = await poolPromise.query(query);
          console.log(`Table created : ${systemTables["GROUPS"]}`)
        }
        catch(e){
          throw e 
        } 

        


        //### create Group Memebership table*/
        query=`CREATE TABLE IF NOT EXISTS ${systemTables["GROUP_MEMBERSHIP"]}(
          ${defaultColumns}  
          group_id BIGINT,
          user_id BIGINT
        )ENGINE=INNODB`;
        defaultConstraints("GROUP_MEMBERSHIP","all")
        constriants.push(`ALTER TABLE ${systemTables["GROUP_MEMBERSHIP"]} ADD CONSTRAINT FOREIGN KEY (group_id) REFERENCES ${systemTables["GROUPS"]}(id)`)
        constriants.push(`ALTER TABLE ${systemTables["GROUP_MEMBERSHIP"]} ADD CONSTRAINT FOREIGN KEY (user_id) REFERENCES ${systemTables["USERS"]}(id)`)
        try{
          res = await poolPromise.query(query);
          console.log(`Table created : ${systemTables["GROUP_MEMBERSHIP"]}`)
        }
        catch(e){
          throw e 
        } 
      


        /*-----------------Create Site List Register table:*/
        query=`CREATE TABLE IF NOT EXISTS ${systemTables["LIST"]}(
          ${defaultColumns}  
          list_name VARCHAR(255)                    
        )ENGINE=INNODB`;          
        defaultConstraints("LIST","all")
        try{
          res = await poolPromise.query(query);
          console.log(`Table created : ${systemTables["LIST"]}`)
        }
        catch(e){
          throw e 
        } 

 




        //### create Routes table
        //route_type d OR f (d is for path to table and f is for path for activity/function)
        query=`CREATE TABLE IF NOT EXISTS ${systemTables["ROUTES"]}(
          ${defaultColumns}  
          route_path VARCHAR(255),
          route_type VARCHAR(255)                       
        )ENGINE=INNODB`;  

        defaultConstraints("ROUTES","all")
        try{
          res = await poolPromise.query(query);
          console.log(`Table created : ${systemTables["ROUTES"]}`)
        }
        catch(e){
          throw e 
        } 







        //### create Permissions table:*/
        query=`CREATE TABLE IF NOT EXISTS ${systemTables["PERMISSIONS"]}(
          ${defaultColumns}
          table_id BIGINT,
          row_id BIGINT,  
          full_control TINYINT(1),
          create_item TINYINT(1),
          read_item   TINYINT(1),
          update_item TINYINT(1),
          delete_item TINYINT(1),
          read_list   TINYINT(1),
          approve_item     TINYINT(1),
          INDEX PermissionIndex (table_id,row_id)  )ENGINE=INNODB`;          
        //FK Contraint on rowPerm is not applied on permissions table (rowPerm Column is not used)
        defaultConstraints("PERMISSIONS","")
        //??? contaraints for table_id and row_id
        try{
          res = await poolPromise.query(query);
          console.log(`Table created : ${systemTables["PERMISSIONS"]}`)
        }
        catch(e){
          throw e 
        }         



        //###-create LIST_COLUMN table:*/
        query=`CREATE TABLE IF NOT EXISTS ${systemTables["LIST_COLUMN"]}(
          ${defaultColumns}  
          column_name VARCHAR(255),
          DataType VARCHAR(255) )ENGINE=INNODB`;      

        defaultConstraints("LIST_COLUMN","all")

        try{
          res = await poolPromise.query(query);
          console.log(`Table created : ${systemTables["LIST_COLUMN"]}`)
        }
        catch(e){
          throw e 
        }  


        




        /*-----------------Add constraints*/
        
        try{
          for(let i=0;i<constriants.length;i++){
            res = await poolPromise.query(constriants[i]);
            console.log(constriants[i])
          }

          
          // res = await poolPromise.query(constriants.join(";\n"));
          console.log(`All registered constraints applied`);
        }
        catch(e){
          throw e 
        }  

        
       



        

        
    });//END Create database

  });



  
 

  


 





