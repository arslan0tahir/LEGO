
var mysql = require('mysql2');
//if "require" is used multiple times in multiple files,
// it will hold the export of one instance and reuse it. 
const dbName="LEGOS";



var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'LEGOS',
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

const systemTableMappedNames={
    Users: "users",
    Groups: `groups`,
    GroupMembership: `group_membership`,
    Permissions: `permissions`,
    SiteRegister: `site_register`,
    SiteListRegister: `site_list_register`,
    SiteListColumnRegister: `site_list_column_register`,

};

const _systemTables={
    users: `\`${dbName}\`.\`users\``,
    groups: `\`${dbName}\`.\`groups\``,
    groupMembership: `\`${dbName}\`.\`group_membership\``,
    permissions: `\`${dbName}\`.\`permissions\``,
    siteRegister: `\`${dbName}\`.\`site_register\``,
    siteListRegister: `\`${dbName}\`.\`site_list_register\``,
    siteListColumnRegister: `\`${dbName}\`.\`site_list_column_register\``,

};

const _systemTableMappedNames={
    users: "users",
    groups: `groups`,
    groupMembership: `group_membership`,
    permissions: `permissions`,
    siteRegister: `site_register`,
    siteListRegister: `site_list_register`,
    siteListColumnRegister: `site_list_column_register`,

};

module.exports={pool,systemTables,systemTableMappedNames,dbName,_systemTableMappedNames,_systemTables}

