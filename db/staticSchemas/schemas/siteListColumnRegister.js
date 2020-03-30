let siteListColumnRegister=[
    {
        columnName: 'columnName', 
        formDataType:'text',
        dbDataType: 'auto',
        dbConstraints: [],
        extraConfigs:{},
        validation: {    
            min:5,
            max:255,       
        }
    },
    {
        columnName: 'DataType', 
        formDataType:'choice',
        dbDataType: 'auto',
        dbConstraints: [],
        extraConfigs:{},
        validation: {    
            min:5,
            max:255,       
        }
    },
    {
        columnName: 'parentList', 
        formDataType:'lookup',
        dbDataType: 'auto',
        dbConstraints: [],
        extraConfigs:{
            foreignKey:{
                refrences: "siteListRegister",
                refrencedColumn: "id",            
            },
        },
        validation: {    
            min:5,
            max:255,       
        }
    },
]

module.exports=siteListColumnRegister