
const dbConfig=require('../../configs/db')
const dbName=dbConfig.dbName;//### define mapping for system tables, st stands for system table



module.exports.systemTables={
    USERS: `\`${dbName}\`.\`st_users\``,
    GROUPS: `\`${dbName}\`.\`st_groups\``,
    GROUP_MEMBERSHIP: `\`${dbName}\`.\`st_group_membership\``,
    PERMISSIONS: `\`${dbName}\`.\`st_permissions\``,
    ROUTES: `\`${dbName}\`.\`st_routes\``,

    LIST: `\`${dbName}\`.\`st_list_register\``,
    LIST_COLUMN: `\`${dbName}\`.\`st_list_column_register\``,
};

module.exports.testTables={
    STUDENTS: `\`${dbName}\`.\`students\``,
    
};