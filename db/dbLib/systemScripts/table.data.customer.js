var {pool,execute}=require('../pool')
const dbConfig=require('../../../configs/db')
const systemTables=require('../tables.map').systemTables
const QB=require('../queryBuilder')
const bcrypt=require('bcrypt')
const {bcryptHash}=require('../../../libraries/bcrypt')
const testTables  = require('../tables.map').testTables
const dbName=dbConfig.dbName;//### define mapping for system tables, st stands for system table
const poolPromise=pool.promise();



let func=async function(){
    var students=[
        {   
                id: 12,
                FirstName: "Arslan",
                LastName: "Tahir",
                Age: "29",
                Class: "10"
        },
        {   
                id: 13,
                FirstName: "Ghulam",
                LastName: "Mustafa",
                Age: "31",
                Class: "10"
        },
        {   
                id: 14,
                FirstName: "Ishaq  ",
                LastName: "Dar",
                Age: "56",
                Class: "12"
        },
        {   
                id: 15,
                FirstName: "Nawaz",
                LastName: "Sharif",
                Age: "34",
                Class: "8"
        },
        {   
                id: 16,
                FirstName: "Ahmad",
                LastName: "Riaz",
                Age: "31",
                Class: "10"
        },
        {   
                id: 17,
                FirstName: "Marwa",
                LastName: "Hussain",
                Age: "11",
                Class: "13"
        },
        {   
                id: 18,
                FirstName: "Rohan",
                LastName: "Tahir",
                Age: "21",
                Class: "12"
        },
        {   
                id: 19,
                FirstName: "Ayesha",
                LastName: "Riaz",
                Age: "31",
                Class: "12"
        },
        {   
                id: 20,
                FirstName: "Ghulam",
                LastName: "Mustafa",
                Age: "32",
                Class: "8"
        },
        {   
                id: 21,
                FirstName: "Ghulam",
                LastName: "Fareed",
                Age: "38",
                Class: "16"
        }
    ]

    for(let student of students){

        let q=QB.item.create(testTables["STUDENTS"], student)
        try{
            res = await execute(q);
            console.log(`Query Executed : ${q}`)
        }
        catch(e){
            throw e 
        }   
        
    }
}

func()