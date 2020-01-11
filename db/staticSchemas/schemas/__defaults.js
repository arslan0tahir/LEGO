//     id BIGINT AUTO_INCREMENT PRIMARY KEY,
//     uuid VARCHAR(36),
//     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     modified TIMESTAMP  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     createdBy bigint,
//     modifiedBy  bigint,

//     inheritRowPermissions TINYINT(1),
//     inheritCellPermissions TINYINT(1),
//     rowPerm BIGINT,
//     cellPerm JSON,

let __defaults=[
    {
        columnName: 'id', 
        formDataType:'id', //text,text box,id ,drop down,number,datetime ,lookup, file, picture, cluster
        dbDataType: 'VARCHAR(255)',//can be selected automatically based upon form datatype
            //auto
            //text its VARCHAR(0-65536)
            //textBox VARCHAR(0-65533)
            //number VARCHAR(0-255)
            //cluster JSON
            //lookup BIGINT foriegn key
            //id BIGINT
            //datetime TIMESTAMP
            //

        dbConstraints: ['AUTO_INCREMENT','PRIMARY KEY'],//NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT
        validation: {
            string:'',//number,object,string ......i.e all joi base params
            min:3,
            max:255,
            aphanum:'',
            required: ''
        }

    },
    
    {
        columnName: 'created', 
        formDataType:'datetime',
        dbDataType: 'TIMESTAMP',
        dbConstraints: ['DEFAULT CURRENT_TIMESTAMP'],
        validation: {            
        }
    },    

    {
        columnName: 'modified', 
        formDataType:'datetime',
        dbDataType: 'TIMESTAMP',
        dbConstraints: ['DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'],
        validation: {            
        }
    },

    {
        columnName: 'createdBy', 
        formDataType:'lookup',
        dbDataType: 'auto',
        foreignKey:{
            refrences: "Users",
            refrencedColumn: "id"
        },
        //dbConstraints: [`FOREIGN KEY (createdBy) REFERENCES ${systemTables["Users"]}(id)`],
        validation:{            
        }
    },

    {
        columnName: 'modifiedBy',
        formDataType:'lookup',
        dbDataType: 'auto',
        foreignKey:{
            refrences: "Users",
            refrencedColumn: "id"
        },
        dbConstraints: [''],
        validation: {            
        }
    },

    {
        columnName: 'inheritRowPermissions',
        formDataType:'bool',
        dbDataType: 'auto',
        dbConstraints: [''],
        validation: {            
        }
    },

    {
        columnName: 'inheritCellPermissions',
        formDataType:'bool',
        dbDataType: 'auto',
        dbConstraints: [''],
        validation: {            
        }
    },

    {//this column is not created for permissions table.
        columnName: 'rowPerm',
        formDataType:'lookup',
        dbDataType: 'auto',
        foreignKey:{
            refrences: "Permissions",
            refrencedColumn: "id",            
        },
        dbConstraints: [''],
        validation: {            
        }
    },

    {
        columnName: 'cellPerm',
        formDataType:'cluster',
        dbDataType: 'auto',
        dbConstraints: [''],
        validation: {            
        }
    },

     
]

