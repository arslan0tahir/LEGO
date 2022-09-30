const mysql = require('mysql2');
const mysqlConfig= require('../../configs/db').connConfig



const pool = mysql.createPool(mysqlConfig);

module.exports=pool;

// pool.query("SELECT * FROM TABLE_NAME",(err, data) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     // rows fetch
//     console.log(data);
// });