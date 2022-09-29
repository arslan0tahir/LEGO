let groupMemebership=[
    
        {
            columnName: 'groupId',
            formDataType:'lookup',
            dbDataType: 'auto',
            extraConfigs:{
                foreignKey:{
                    refrences: "groups",
                    refrencedColumn: "id",            
                },
            },        
            dbConstraints: [],
            validation: {            
            }
        },
        {
            columnName: 'userId',
            formDataType:'lookup',
            dbDataType: 'auto',
            extraConfigs:{
                foreignKey:{
                    refrences: "users",
                    refrencedColumn: "id",            
                },
            },        
            dbConstraints: [],
            validation: {            
            }
        }
]

module.exports=groupMemebership;