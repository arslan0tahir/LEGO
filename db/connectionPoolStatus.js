let {pool}=require("./modules/connection")

console.log(`
${pool.config.connectionLimit}          // passed in max size of the pool
${pool._freeConnections.length}         // number of free connections awaiting use
${pool._allConnections.length}          // number of connections currently created, including ones in use
${pool._acquiringConnections.length}    // number of connections in the process of being acquired

`)