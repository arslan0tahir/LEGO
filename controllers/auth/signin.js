const { sign } = require('jsonwebtoken');
const signinLdap=require('./signinLdap')
const signinLocal=require('./signinLocal')

let signin={};
let local={};

// signin.ldap=signinLdap.ldap;
signin.local=signinLocal.local;

module.exports=signin;





