module.exports = {
    
        ldapOpts: {
          url: 'LDAP://server.red.local/Default naming context',
          // tlsOptions: { rejectUnauthorized: false }
        },
        adminDn: 'CN=ldapAdmin,CN=Users,DC=red,DC=local',// adminDn and adminPassword is compulsary if usedDN is not available
        adminPassword: '0123456789',
        // userDn: 'CN=Mr. ARSLAN TAHIR,OU=DGD,OU=Internet Users,DC=red,DC=local',
        userSearchBase: 'dc=red,dc=local',
        // userSearchBase: 'dc=red,dc=local',
        usernameAttribute: 'sAMAccountName',
        
        userPassword: '',
        username: '',
        ldapDomain: 'red.local',//my property
        // starttls: false
      
  };