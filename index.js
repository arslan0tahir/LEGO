const expressApp=require('./libraries/expressApp')
// const express = require('express')
var siteLists = require('./routes/system/siteLists/siteLists')
var auth_signin= require('./routes/auth/signin')
var auth_signup= require('./routes/auth/signup')
const cors = require('cors');

var bodyParser     =        require("body-parser");

const app = expressApp.app;
const port = 33333

// app.get('/', (req, res) => res.send('Hello World!'))

app.use(cors({
    // origin: ['https://127.0.0.1:3000']
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


app.use('/_api/auth/signin',auth_signin);
app.use('/_api/auth/signup',auth_signup);




//endpoint to CRUD on lists metadata of perticular site
// app.use('/:siteId/system/sitelists/:ListId', siteLists)

// app.use(/.*System\/SiteLists/i,siteLists)


// function(req,res,next){
//     app.use(siteLists);
//     res.send("regex matched");
// }test

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

