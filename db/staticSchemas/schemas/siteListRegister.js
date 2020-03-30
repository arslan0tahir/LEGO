let siteListRegister=[
    {
        columnName: 'listName', 
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
        columnName: 'parentSite', 
        formDataType:'lookup',
        dbDataType: 'auto',
        dbConstraints: [],
        extraConfigs:{
            foreignKey:{
                refrences: "siteRegister",
                refrencedColumn: "id",            
            },
        },
        validation: {    
            min:5,
            max:255,       
        }
    },
]

module.exports=siteListRegister