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

let __defaults={
    id:{
        formDataType:['id'], //text,text box,id ,drop down,number, lookup, file, picture, cluster
        dbDataType: 'VARCHAR(255)',//can be selected automatically based upon form datatype
            //text its VARCHAR(0-65536)
            //textBox VARCHAR(0-65533)
            //number VARCHAR(0-255)
            //cluster JSON
            //lookup BIGINT
            //id BIGINT

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