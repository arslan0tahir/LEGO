// // var express = require('express');
// // var dbHelper= require('../../../db/modules/helper')
// // var router = express.Router({mergeParams: true})
// // var cJSON=require("circular-json")




// router.post('/', function (req, res) {
  
//   let baseUrl=req.baseUrl.split("/");
//   let siteId='';

  
//   //if Site Id is used
//   if (baseUrl.length==4 && baseUrl[1]==String(Number(baseUrl[1]))){
//     siteId=baseUrl[1];
//   }
//   else{//If Site Path is used
//     //***will be implemented in future
//     //***query database and fetch appropriate site id
//     siteId=-1;
//   }
//   // helper.nestedJsonObjectTotDb(req.body,req.body,0);

//   //reform the object from the POST i.e list and its associated columns
//   let q={
//     __ListAlias__ : "SiteListRegister",
//     __ListId__ : "",
//     cellPerm: null,
//     listName : "Complaints",
//     parentSite: "1",
//     SiteListColumnRegister: [
//        {
//           columnName: "Title",
//           DataType: "textbox",
//           rowPerm: {
//              __ListAlias__: "Permissions",
//              __ListId__: "",
//              fullControl: "{ }",
//              createItem: "{ \"u\":[1], \"g\":[1] }",
//              readItem: "{ }",
//              updateItem: "{ \"u\":[1], \"g\":[1] }",
//              deleteItem: "{  }",
//              chnagePermissions: "{ \"u\":[1], \"g\":[1] }"
//           }
//        }
//     ]
//   }
//   res.status(200).send(`post recieved ${JSON.stringify(req.body,null,3)}`);
// })





// router.get('/:listId', function (req, res) {
//   let baseUrl=req.baseUrl.split("/");
//   let siteId='';

//   //if Site Id is used
//   if (baseUrl.length==4 && baseUrl[1]==String(Number(baseUrl[1]))){
//     siteId=baseUrl[1];
//   }
//   else{//If Site Path is used
//     //***will be implemented in future
//     //***query database and fetch appropriate site id
//     siteId=-1;
//   }

//   r=req.url;
//   res.status(200).send(`
//     requested url ${req.baseUrl.split("/")} <br>
//     siteId ${siteId} <br>
//     get recieved and list id: "+ ${JSON.stringify(req.params['listId'])}`);
// })

// module.exports = router