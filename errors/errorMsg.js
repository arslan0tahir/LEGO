module.exports.errorMsg={
    SERVER_OFFLINE:{
        ldap:       "ldap server is offline",
        database:   "data server is offline"

    },
    
    SERVER_ERROR:{
        ldap:                           "ldap server responded with error",
        local:                          "local authentcation failed",
        localAuthServerFailed :         "local aauthentication server not responded",
        jwt:                            "token failed",
        db:                             "db not responding",
        authFailed:                     "all authentication method failed",
        alreadyAuthticated:             "You are already authenticated"
    },

    FORBIDDEN:{
        restricted:                     "Restricted resource",
    },
    INVALID_INPUT:{
        emptyRequest:                     "No input was provided in request",
    }
}