var mysql = require('mysql');
var pool=require('../../libraries/db/pool')
// var uuid=require('uuid/v1');
// const bcrypt = require('bcrypt');
const dbConfig=require('../../configs/db')
//[START initialize info for bcrypt]
const saltRounds = 10;
const myAdminPassword = 'admin';
//[END initialize info for bcrypt]




const dbName=dbConfig.dbName;

let constriants=[];

//### define mapping for system tables, st stands for system table
const systemTables={
    Users: `\`${dbName}\`.\`st_users\``,
    Groups: `\`${dbName}\`.\`st_groups\``,
    GroupMembership: `\`${dbName}\`.\`st_group_membership\``,
    Permissions: `\`${dbName}\`.\`st_permissions\``,

    SiteRegister: `\`${dbName}\`.\`site_register\``,
    SiteListRegister: `\`${dbName}\`.\`site_list_register\``,
    SiteListColumnRegister: `\`${dbName}\`.\`site_list_column_register\``,

};

//default columns are created in each table
const defaultColumns=`
    id                BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid              VARCHAR(36),

    created           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified          TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy         BIGINT,
    modifiedBy        BIGINT,

    permission        BIGINT,`
//cell permissions

const defaultConstraints=function(tableName,qty){
      
      if(qty=="all"){
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (createdBy) REFERENCES ${systemTables["Users"]}(id)`)
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (modifiedBy) REFERENCES ${systemTables["Users"]}(id)`)
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (permission) REFERENCES ${systemTables["Permissions"]}(id)`)
      }
      else {
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (createdBy) REFERENCES ${systemTables["Users"]}(id)`)
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (modifiedBy) REFERENCES ${systemTables["Users"]}(id)`)
       
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
  pool.query(`DROP DATABASE  IF EXISTS ${dbName}`, function (err, result) {
    if (err) throw err;
    console.log("Database deleted");
      //### create a database named "legos":
    pool.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, function (err, result) {
        if (err) throw err;
        console.log("Database created");


        //### create USERS table:*/
        let query=`
        CREATE TABLE IF NOT EXISTS ${systemTables["Users"]} (
        ${defaultColumns}  
        user_name  VARCHAR(255),
        email VARCHAR(255),
        authentication_type VARCHAR(255),
        password VARCHAR (255),
        profile BIGINT,

        UNIQUE uniquekey (user_name,email) )ENGINE=INNODB`;
        defaultConstraints("Users","all");

        pool.query(query, function (err, result) {
          if (err) throw err;
          console.log(`Table created : ${systemTables["Users"]}`);
          // console.log(result)
        });
        // pool.destroy()




        /*-----------------Create Groups table:*/
        query=`CREATE TABLE IF NOT EXISTS ${systemTables["Groups"]}(
          ${defaultColumns}  
          groupName VARCHAR(255),
          email VARCHAR(255) )ENGINE=INNODB`;
        defaultConstraints("Groups","all")

        pool.query(query, function (err, result) {
          if (err) throw err;
          console.log(`Table created : ${systemTables["Groups"]}`);
        });
        
        return;
        
        /*-----------------Create GroupMemebership tablele*/
        query=`CREATE TABLE IF NOT EXISTS ${systemTables["GroupMembership"]}(
          ${defaultColumns}  
          groupId BIGINT,
          userId BIGINT
        )ENGINE=INNODB`;
        defaultConstraints("GroupMembership","all")
        constriants.push(`ALTER TABLE ${systemTables["GroupMembership"]} ADD CONSTRAINT FOREIGN KEY (groupId) REFERENCES ${systemTables["Groups"]}(id)`)
        constriants.push(`ALTER TABLE ${systemTables["GroupMembership"]} ADD CONSTRAINT FOREIGN KEY (userId) REFERENCES ${systemTables["Users"]}(id)`)
        
        pool.query(query, function (err, result) {
          if (err) throw err;
          console.log(`Table created : ${systemTables["GroupMembership"]}`);
        });
        

        /*-----------------Create Permissions table:*/
        query=`CREATE TABLE IF NOT EXISTS ${systemTables["Permissions"]}(
          ${defaultColumns}  
          fullControl JSON,
          createItem JSON,
          readItem JSON,
          updateItem JSON,
          deleteItem JSON,
          changePermissions JSON            
        )ENGINE=INNODB`;
        //FK Contraint on rowPerm is not applied on permissions table (rowPerm Column is not used)
        defaultConstraints("Permissions","")

        pool.query(query, function (err, result) {
          if (err) throw err;
          console.log(`Table created : ${systemTables["Permissions"]}`);
        });

        /*-----------------Create Site Register table:*/
        query=`CREATE TABLE IF NOT EXISTS ${systemTables["SiteRegister"]}(
          ${defaultColumns}  
          siteName VARCHAR(255),
          parentSite BIGINT                      
        )ENGINE=INNODB`;          
        defaultConstraints("SiteRegister","all")
        constriants.push(`ALTER TABLE ${systemTables["SiteRegister"]} ADD CONSTRAINT FOREIGN KEY (parentSite) REFERENCES ${systemTables["SiteRegister"]}(id)`)


        pool.query(query, function (err, result) {
          if (err) throw err;
          console.log(`Table created : ${systemTables["SiteRegister"]}`);
        });


        /*-----------------Create Site List Register table:*/
        query=`CREATE TABLE IF NOT EXISTS ${systemTables["SiteListRegister"]}(
          ${defaultColumns}  
          listName VARCHAR(255),
          parentSite BIGINT                      
        )ENGINE=INNODB`;          
        defaultConstraints("SiteListRegister","all")
        constriants.push(`ALTER TABLE ${systemTables["SiteListRegister"]} ADD CONSTRAINT FOREIGN KEY (parentSite) REFERENCES ${systemTables["SiteRegister"]}(id)`)


        pool.query(query, function (err, result) {
          if (err) throw err;
          console.log(`Table created : ${systemTables["SiteListRegister"]}`);
        });

        /*-----------------Create Site List Column Register table:*/
        query=`CREATE TABLE IF NOT EXISTS ${systemTables["SiteListColumnRegister"]}(
          ${defaultColumns}  
          columnName VARCHAR(255),
          DataType VARCHAR(255),
          parentList BIGINT                      
        )ENGINE=INNODB`;          
        defaultConstraints("SiteListColumnRegister","all")
        constriants.push(`ALTER TABLE ${systemTables["SiteListColumnRegister"]} ADD CONSTRAINT FOREIGN KEY (parentList) REFERENCES ${systemTables["SiteListRegister"]}(id)`)


        pool.query(query, function (err, result) {
          if (err) throw err;
          console.log(`Table created : ${systemTables["SiteListColumnRegister"]}`);
        });


        /*-----------------Add constraints*/
        console.log(constriants.join(";\n"))
        con.query(constriants.join(";"), function (err, result) {
          if (err) throw err;
          console.log(`All registered constraints applied`);
        });

        

        //  console.log(baseData.join(";\n"))
        //  con.query(baseData.join(";"), function (err, result) {
        //    if (err) throw err;
        //    console.log(`All registered constraints applied`);
        //  });



        

        pool.end();
    });//END Create database

  });



  
 

  


 





