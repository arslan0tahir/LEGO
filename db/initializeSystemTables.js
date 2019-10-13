var mysql = require('mysql');
var uuid=require('uuid/v1');
const bcrypt = require('bcrypt');

//[START initialize info for bcrypt]
const saltRounds = 10;
const myAdminPassword = 'admin';
//[END initialize info for bcrypt]

const dbName="LEGOS";


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  multipleStatements: true
});

let constriants=[];
const systemTables={
    Users: `\`${dbName}\`.\`users\``,
    Groups: `\`${dbName}\`.\`groups\``,
    GroupMembership: `\`${dbName}\`.\`group_membership\``,
    Permissions: `\`${dbName}\`.\`permissions\``,
    SiteRegister: `\`${dbName}\`.\`site_register\``,
    SiteListRegister: `\`${dbName}\`.\`site_list_register\``,
    SiteListColumnRegister: `\`${dbName}\`.\`site_list_column_register\``,

};

//default columns are created in each table
const defaultColumns=`
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdBy bigint,
    modifiedBy  bigint,

    inheritRowPermissions TINYINT(1),
    inheritCellPermissions TINYINT(1),
    rowPerm BIGINT,
    cellPerm JSON,`
//cell permissions

const defaultConstraints=function(tableName,qty){
      
      if(qty=="all"){
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (createdBy) REFERENCES ${systemTables[tableName]}(id)`)
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (modifiedBy) REFERENCES ${systemTables[tableName]}(id)`)
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (rowPerm) REFERENCES ${systemTables[tableName]}(id)`)
      }
      else {
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (createdBy) REFERENCES ${systemTables[tableName]}(id)`)
          constriants.push(`ALTER TABLE ${systemTables[tableName]} ADD CONSTRAINT FOREIGN KEY (modifiedBy) REFERENCES ${systemTables[tableName]}(id)`)
       
      }
}
 




con.connect(function(err) {
  if (err) throw err;

  console.log("Connected!");
  
  
  /*Delete already existed database named "legos":*/
  con.query(`DROP DATABASE  IF EXISTS ${dbName}`, function (err, result) {
    if (err) throw err;
    console.log("Database deleted");

  });


  /*-----------------Create a database named "legos":*/
  con.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, function (err, result) {
          if (err) throw err;
          console.log("Database created");


          /*-----------------Create USERS table:*/
          let query=`CREATE TABLE IF NOT EXISTS ${systemTables["Users"]} (
            ${defaultColumns}  
            userName VARCHAR(255),
            email VARCHAR(255),
            authenticationType VARCHAR(255),
            passwordHash VARCHAR (255),
            profile JSON)ENGINE=INNODB`;

            defaultConstraints("Users","all")
         
          // console.log(query)
          con.query(query, function (err, result) {
            if (err) throw err;
            console.log(`Table created : ${systemTables["Users"]}`);
          });
         
          /*-----------------Create Groups table:*/
          query=`CREATE TABLE IF NOT EXISTS ${systemTables["Groups"]}(
            ${defaultColumns}  
            groupName VARCHAR(255),
            email VARCHAR(255),
            profile JSON
          )ENGINE=INNODB`;
          defaultConstraints("Groups","all")

          con.query(query, function (err, result) {
            if (err) throw err;
            console.log(`Table created : ${systemTables["Groups"]}`);
          });
          
          
          /*-----------------Create GroupMemebership tablele*/
           query=`CREATE TABLE IF NOT EXISTS ${systemTables["GroupMembership"]}(
            ${defaultColumns}  
            groupId BIGINT,
            userId BIGINT
          )ENGINE=INNODB`;
          defaultConstraints("GroupMembership","all")
          constriants.push(`ALTER TABLE ${systemTables["GroupMembership"]} ADD CONSTRAINT FOREIGN KEY (groupId) REFERENCES ${systemTables["Groups"]}(id)`)
          constriants.push(`ALTER TABLE ${systemTables["GroupMembership"]} ADD CONSTRAINT FOREIGN KEY (userId) REFERENCES ${systemTables["Users"]}(id)`)
          
          con.query(query, function (err, result) {
            if (err) throw err;
            console.log(`Table created : ${systemTables["GroupMembership"]}`);
          });
          
           /*-----------------Create Permissions table:*/
           query=`CREATE TABLE IF NOT EXISTS ${systemTables["Permissions"]}(
            ${defaultColumns}  
            createPerm JSON,
            readPerm JSON,
            updatePerm JSON,
            deletePerm JSON            
          )ENGINE=INNODB`;
          //FK Contraint on rowPerm is not applied on permissions table (rowPerm Column is not used)
          defaultConstraints("Permissions","")
      
          con.query(query, function (err, result) {
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

      
          con.query(query, function (err, result) {
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

      
          con.query(query, function (err, result) {
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

      
          con.query(query, function (err, result) {
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



           

          con.end();
  });//END Create database
  
 

  
  /*Create a database named "legos":*/

 

});//con end



