let SiteListRegister={
    listName:{
        formDataType:['text'], //text,text box,drop down,number, lookup, file, picture, cluster
        dbDataType: 'VARCHAR(255)',//is selected automatically based upon form datatype
            //text its VARCHAR(0-65536)
            //textBox VARCHAR(0-65533)
            //number VARCHAR(0-255)
            //cluster JSON
            //lookup BIGINT

        dbConstraints: ['NOT NULL','UNIQUE'],//NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT
        validation: {
            string:'',//number,object,string ......i.e all joi base params
            min:3,
            max:255,
            aphanum:'',
            required: ''
        }

    },

}