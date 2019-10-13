
var mysql = require('mysql2');

const dbName="LEGOS";

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   multipleStatements: true// it can increase the scope of SQL injection
// });


// var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    multipleStatements: true,
    connectionLimit : 10,
    // database : 'legos'
});
//pool.query it will automatically realease connection but cant be used in trnasactions
//pool.getconnection

const systemTables={
    Users: `\`${dbName}\`.\`users\``,
    Groups: `\`${dbName}\`.\`groups\``,
    GroupMembership: `\`${dbName}\`.\`group_membership\``,
    Permissions: `\`${dbName}\`.\`permissions\``,
    SiteRegister: `\`${dbName}\`.\`site_register\``,
    SiteListRegister: `\`${dbName}\`.\`site_list_register\``,
    SiteListColumnRegister: `\`${dbName}\`.\`site_list_column_register\``,

};
//whenever this module is called the same single connection instance is returned and reused
module.exports={pool,systemTables,dbName}

