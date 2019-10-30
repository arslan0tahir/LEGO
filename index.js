const express = require('express')
var siteLists = require('./routes/system/siteLists/siteLists')
var bodyParser     =        require("body-parser");

const app = express()
const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//endpoint to CRUD on lists metadata of perticular site
// app.use('/:siteId/system/sitelists/:ListId', siteLists)

app.use(/.*System\/SiteLists/i,siteLists)


// function(req,res,next){
//     app.use(siteLists);
//     res.send("regex matched");
// }

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

