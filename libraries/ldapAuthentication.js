const { authenticate } = require('ldap-authentication')
const ldapConfig=require('../configs/ldap.js')




const auth=async function auth(userName,userPassword) {
    
    let authenticatedUser
    // auth with regular user
    options = ldapConfig
    options.username=userName;
    options.userPassword=userPassword;
    //   {
    //     ldapOpts: {
    //       url: 'LDAP://server.red.local/Default naming context',
    //       // tlsOptions: { rejectUnauthorized: false }
    //     },
    //     adminDn: 'CN=ldapAdmin,CN=Users,DC=red,DC=local',// adminDn and adminPassword is compulsary if usedDN is not available
    //     adminPassword: '0123456789',
    //     // userDn: 'CN=Mr. ARSLAN TAHIR,OU=DGD,OU=Internet Users,DC=red,DC=local',
    //     userPassword: '0123456789',
    //     userSearchBase: 'dc=red,dc=local',
    //     // userSearchBase: 'dc=red,dc=local',
    //     usernameAttribute: 'sAMAccountName',
    //     username: '57432',
    //     // starttls: false
    //   }
    try{
        authResult = await authenticate(options)
    }
    catch(error){
        authResult=error
    }

    return authResult
}

module.exports.auth=auth;