const mysql = require('mysql2');
const mysqlConfig= require('../../configs/db').connConfig



const pool = mysql.createPool(mysqlConfig);
const poolPromise=pool.promise();

module.exports.pool=pool;
module.exports.poolPromise=poolPromise;
module.exports.execute=async function(query){
    try{
        res = await poolPromise.query(query);
        console.log(`Query Executed : ${query}`)
        return res;
    }
    catch(e){
        throw e 
    } 
}


// pool.query("SELECT * FROM TABLE_NAME",(err, data) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     // rows fetch
//     console.log(data);
// });