const db = require("../../db/db");
const bcrypt=require('bcrypt');

let local={};


local.authenticate=async function(username,password){
    
    let isAuthenticated=0;
    const dbUser=await db.process.getUser(username)

    if (dbUser.user_name==username){
        isAuthenticated=bcrypt.compareSync(password,dbUser.password);
        return {
            isAuthenticated:isAuthenticated,
            user:{
                username: dbUser.user_name,            
                fullName: dbUser.full_name
            }
        }
    }

    return {
        isAuthenticated:isAuthenticated,
        user:{}
    }
    // console.log(user);
}
module.exports.local=local;