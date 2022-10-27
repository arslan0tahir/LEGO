
const dbConfig=require('../../configs/db')
const dbName=dbConfig.dbName;//### define mapping for system tables, st stands for system table






module.exports.systemTables={
    USERS: `\`${dbName}\`.\`st_users\``,
    GROUPS: `\`${dbName}\`.\`st_groups\``,
    GROUP_MEMBERSHIP: `\`${dbName}\`.\`st_group_membership\``,
    PERMISSIONS: `\`${dbName}\`.\`st_permissions\``,
    // ROUTES: `\`${dbName}\`.\`st_routes\``,
    
    APP: `\`${dbName}\`.\`st_apps\``,
    LIST: `\`${dbName}\`.\`st_lists\``,
    LIST_COLUMN: `\`${dbName}\`.\`st_list_columns\``,
    LIST_VIEWS: `\`${dbName}\`.\`st_list_views\``,
};

module.exports.testTables={
    STUDENTS: `\`${dbName}\`.\`students\``,
    
};