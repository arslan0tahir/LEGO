let groups=[
    {
        columnName: 'grouName', 
        formDataType:'text', //text,text box,id ,drop down,number,datetime ,lookup, file, picture, cluster
        dbDataType: 'auto',//can be selected automatically based upon form datatype
            //auto
            //text is VARCHAR(0-65536)
            //password is VARCHAR(255)
            //dropDown VARCHAR(0-65536)
            //textBox VARCHAR(0-65533)
            //number VARCHAR(0-255)
            //cluster JSON
            //lookup BIGINT foriegn key
            //id BIGINT
            //datetime TIMESTAMP
            //

        dbConstraints: [''],//NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT
        extraConfigs:{
            //foriegnKeys
            //options--for dropdown datatypes
            //much more 
        },
        validation: {
            string:'',//number,object,string ......i.e all joi base params
            min:3,
            max:255,
            aphanum:'',
            required: ''
        }

    },
    {
        columnName: 'email', 
        formDataType:'text', //text,text box,id ,drop down,number,datetime ,lookup, file, picture, cluster
        dbDataType: 'auto',//can be selected automatically based upon form datatype
        dbConstraints: [''],//NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT
        extraConfigs:{
           
        },
        validation: {
           
        }

    },
    {
        columnName: 'profile', 
        formDataType:'cluster', //text,text box,id ,drop down,number,datetime ,lookup, file, picture, cluster
        dbDataType: 'auto',//can be selected automatically based upon form datatype
        dbConstraints: [''],//NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT
        extraConfigs:{
           
        },
        validation: {
           
        }

    },

]
module.exports=groups;