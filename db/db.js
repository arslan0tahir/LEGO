//db function are meant to be logic free. all they are doing is reading or writing to DB
//for logic controller shall be implemented 
const process=require('./db.process')
const {pool,execute,poolPromise}=require('./dbLib/pool')

const db={};
db.process=process;
db.pool=pool;
db.poolPromise=poolPromise;
db.execute=execute;


module.exports=db;
