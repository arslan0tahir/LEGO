

let users=[
    {
        columnName: 'userName', 
        formDataType:'text', //text,text box,id ,dropdown,number,datetime ,lookup, file, picture, cluster
        dbDataType: 'auto',//can be selected automatically based upon form datatype
            //auto
            //text its VARCHAR(0-65536)
            //textBox VARCHAR(0-65533)
            //number VARCHAR(0-255)
            //cluster JSON
            //lookup BIGINT foriegn key
            //id BIGINT
            //datetime TIMESTAMP
            //
        extraConfigs:{
            //foriegnKeys
            //options--for dropdown datatypes
            //much more 
        },
        dbConstraints: [],//NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT
        
        validation: {
            string:'',//number,object,string ......i.e all joi base params
            min:3,
            max:255,
            required: ''
        }

    },
    
    {
        columnName: 'email', 
        formDataType:'text',
        dbDataType: 'auto',
        dbConstraints: [],
        extraConfigs:{
            
        },
        validation: {    
            min:5,
            max:255,       
        }
    },    

    {
        columnName: 'authenticationType', 
        formDataType:'choice',
        dbDataType: 'auto',
        dbConstraints: [],
        extraConfigs:{
            options:[
                {
                    label:"Local Authentication",
                    value: "local",                    
                },
                {
                    label:"LDAP Authemtication",
                    value: "ldap",                    
                },
                {
                    label:"Google Account",
                    value: "google",                    
                },                
            ],
        },
        validation: {     
            min:3,
            max:255,         
        }
    },
    {
        columnName: 'passwordHash', 
        formDataType:'password',
        dbDataType: 'auto',
        dbConstraints: [],
        extraConfigs:{

        },
        validation: {    
            min:5,
            max:255,       
        }
    },

    {
        columnName: 'profile', 
        formDataType:'cluster',
        dbDataType: 'auto',
        dbConstraints: [],
        extraConfigs:{
            
        },
        validation: {    
                  
        }
    }

     
]

module.exports=users;