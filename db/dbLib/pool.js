const mysql = require('mysql2');
const mysqlConfig= require('../../configs/db').connConfig
const logger=require('../../logger/logger')

const pool = mysql.createPool(mysqlConfig);
const poolPromise=pool.promise();

const LOGGER_IDENTITY=" <DB: POOL> "

module.exports.pool=pool;
module.exports.poolPromise=poolPromise;

module.exports.execute=async function(q){
    const query=q.q;
    const action=q.action;

    try{
        logger.info(LOGGER_IDENTITY + "trying...... \n" + query )
        res = await poolPromise.query(query);
        // console.log(`Query Executed : ${query}`)
        logger.info(LOGGER_IDENTITY + "query \n" + query )
        logger.info(LOGGER_IDENTITY +"query respose \n" +JSON.stringify(res[0]) ) 
        return res;
    }
    catch(e){
        logger.error(LOGGER_IDENTITY+e.message)
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